import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ellipsis, ListWrapper, useApolloMutation } from '../../../../../components';
import { parseSearch } from '../../../../../utils';
import query from '../../project-graphql/query';
import ElevationPreview from '../ElevationPreview/ElevationPreview';
import copyElevationMutation from './copy-elevation';
import deleteElevationMutation from './delete-elevation';

export default function ElevationSearch({
    history,
    location: {
        search,
    },
    match: {
        path,
    },
    queryResult: {
        _project: {
            name = "",
            _elevations = [],
        } = {},
    },
}) {
    console.log(arguments[0]);

    const [deleteElevation, { __raw: { loading: deleting } }] = useApolloMutation(deleteElevationMutation, {
        awaitRefetchQueries: true,
        refetchQueries: () => [{
            query,
            variables: {
                id: parseSearch(window.location.search).projectId,
            },
        }],
    });
    const [copyElevation, copyResult] = useApolloMutation(copyElevationMutation, {
        awaitRefetchQueries: true,
        refetchQueries: () => [{
            query,
            variables: {
                id: parseSearch(window.location.search).projectId,
            },
        }],
    });
    const [copying, setCopying] = useState(false);
    const [copiedElevationId, setCopiedElevationId] = useState();

    const cancelCopy = useCallback(() => setCopying(false), [setCopying]);
    const cancelCopyOnEscape = useCallback(({ key }) => key === 'Escape' && setCopying(false), [setCopying]);

    useEffect(() => {
        window.addEventListener('click', cancelCopy);
        window.addEventListener('keydown', cancelCopyOnEscape);
        return () => {
            window.removeEventListener('click', cancelCopy);
            window.removeEventListener('keydown', cancelCopyOnEscape);
        }
    }, []);

    // console.log({
    //     copying,
    //     // selectedElevation,
    //     runningCopy,
    // });

    return (
        <div
            id="ElevationSearch"
            className="card"
            onClick={e => e.stopPropagation()}
        >
            <ListWrapper
                identifier="id"
                titleBar={{
                    title: copying ? "Copy Elevation" : "Elevations",
                    snailTrail: [name || <Ellipsis />]
                }}
                items={_elevations}
                defaultPillProps={{
                    type: "tile",
                    align: "left",
                }}
                mapPillProps={({ id, name, preview }) => {
                    const copyingThisElevation = copying && (id === copiedElevationId);
                    const selected = copying && (!copiedElevationId || copyingThisElevation);
                    const title = name;
                    const hoverButtons = copying ? [
                        {
                            text: "Copy",
                            onClick: async () => {
                                try {
                                    setCopiedElevationId(id);

                                    const {
                                        copyElevation: {
                                            elevation: {
                                                id: newId,
                                            },
                                        },
                                    } = await copyElevation({
                                        elevationId: id,
                                        newName: name.replace(/( \((\d+)\))?$/, (match, group, num) => ` (${(+num || 0) + 1})`),
                                    });


                                    // history.push(`${path}/elevation/elevation-info${parseSearch(search)
                                    //     .update({ elevationId: newId })}`);

                                } catch (err) {
                                    // console.log({ err });
                                } finally {
                                    setCopying(false);
                                    setCopiedElevationId();
                                }
                            },
                        },
                    ] : [
                            {
                                children: (
                                    <Link
                                        to={`${path}/elevation/build-elevation${parseSearch(search)
                                            .update({ elevationId: id })}`}
                                    >
                                        Load
                                    </Link>
                                ),
                            },
                            {
                                children: (
                                    <Link
                                        to={{
                                            pathname: `${path}/elevation/elevation-info`,
                                            search: `${parseSearch(search).update({ elevationId: id })}`,
                                            state: {
                                                previousPath: path,
                                                previousSearch: search,
                                            },
                                        }}
                                    >
                                        Info
                                    </Link>
                                ),
                            },
                        ];
                    const children = copyingThisElevation ? (
                        <Ellipsis text="Copying" />
                    ) : (
                            <ElevationPreview preview={preview} />
                        );
                    return {
                        title,
                        selected,
                        hoverButtons,
                        children,
                    };
                }}
                circleButton={{
                    type: "tile",
                    className: copying ? "primary" : undefined,
                    otherButtons: copying ? [] : [
                        {
                            children: (
                                <Link
                                    to={`${
                                        path
                                        }/elevation/create-elevation${
                                        parseSearch(search)
                                            .remove("elevationId", "bugId", "sampleElevation")
                                        }`}
                                >
                                    Create
                                    </Link>
                            ),
                        },
                        {
                            text: "Copy",
                            onClick: () => setCopying(true),
                        },
                    ],
                    renderTextInsteadOfButton: copying ? (
                        <>
                            <div>Select</div>
                            <div>An</div>
                            <div>Elevation</div>
                            <button
                                onClick={() => setCopying(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : undefined,
                }}
                onDelete={copying ? undefined : ({ arguments: { id } }) => deleteElevation({ elevationId: id })}
                deleteModal={copying ? undefined : {
                    name: "Elevation",
                    finishing: deleting,
                }}
            />
        </div>
    );
}
