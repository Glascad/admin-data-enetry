import React, { useState, useCallback, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
    ListWrapper,
    ApolloWrapper,
    Ellipsis,
    useMutation,
} from '../../../../../components';

import { parseSearch } from '../../../../../utils';

import deleteElevationMutation from './delete-elevation';
import copyElevationMutation from './copy-elevation';

import ElevationPreview from '../ElevationPreview/ElevationPreview';

export default function ElevationSearch({
    history,
    location: {
        search,
    },
    match: {
        path,
    },
    queryStatus: {
        _project: {
            name = "",
            _elevations = [],
        } = {},
    },
}) {
    const [deleteElevation, deleteResult, deleting] = useMutation(deleteElevationMutation);
    const [copyElevation, copyResult, runningCopy] = useMutation(copyElevationMutation);
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
                    selections: [name || <Ellipsis />]
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
                                        newName: `${name} - Copy`,
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
                            <ElevationPreview
                                preview={preview}
                            />
                        );
                    return {
                        title,
                        selected,
                        hoverButtons,
                        children,
                    };
                }
                }
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
