import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import { Ellipsis, ListWrapper, SVG, TitleBar, useApolloQuery, useApolloMutation } from '../../../../components';
import F from '../../../../schemas';
import { parseSearch } from '../../../../utils';
import './Parts.scss';

const query = gql`query partsByManufacturer($id: Int!) {
    allParts(condition: {
        manufacturerId: $id
    }) {
        nodes {
            ...PartFields
        }
    }
}${F.MNFG.PART_FIELDS}`;

const mutation = gql`mutation DeletePartById($id: Int!){
    deletePartById(input: {
        id: $id
    }) {
        part {
            id,
            nodeId,
            partNumber,
        }
    }
}`;

AllParts.navigationOptions = {
    path: '/all',
};

export default function AllParts({
    match: {
        path,
    },
    location: {
        search,
        state: {
            refetch: shouldRefetch,
        } = {},
    },
    history,
    _manufacturer: {
        id,
        name,
    } = {},
}) {
    console.log(arguments[0]);
    const { manufacturerId } = parseSearch(search);
    const queryResult = useApolloQuery(
        query,
        {
            variables: {
                id: +manufacturerId,
            },
            fetchPolicy: shouldRefetch ? "no-cache" : "cache-first",
        });
    console.log({ queryResult });
    const {
        allParts = [],
        __raw: {
            refetch,
            loading: fetching,
        }
    } = queryResult;

    const [deletePart] = useApolloMutation(mutation);

    return (
        <>
            <div
                id="AllParts"
                className="card"
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                    e.preventDefault();
                    const {
                        dataTransfer: {
                            files,
                        },
                    } = e;
                    const args = [`${path.replace(/all/, 'import')}${search}`, { dataTransfer: { files } }];
                    console.log({ args });
                    history.push(...args);
                }}
            >
                <TitleBar
                    title="Parts"
                    snailTrail={[
                        fetching ?
                            <Ellipsis />
                            :
                            name,
                    ]}
                />
                <ListWrapper
                    identifier='id'
                    items={allParts.map(({ partNumber, paths, id }) => ({
                        id,
                        dataCy: partNumber,
                        title: partNumber,
                        type: "tile",
                        align: "left",
                        children: (
                            <SVG
                                className="part-preview"
                                paths={paths}
                            />
                        ),
                        hoverButtons: [
                            //     {
                            //     children: (
                            //         <Link
                            //             to=""
                            //         >
                            //             Load
                            //         </Link>
                            //     ),
                            // },
                            {
                                children: (
                                    <Link
                                        data-cy={`${partNumber}-info`}
                                        to={`${path.replace(/all/, 'info')}${parseSearch(search).update({ partId: id })}`}
                                    >
                                        Info
                                </Link>
                                ),
                            }],
                    }))}
                    onDelete={async ({ arguments: { id } }) => {
                        await deletePart({ id })
                        refetch()
                    }}
                    deleteModal={{
                        name: "Part",
                    }}
                    circleButton={{
                        type: "tile",
                        className: "primary",
                        renderTextInsteadOfButton: "Drag and drop .dxf files here",
                    }}
                />
            </div>
        </>
    );
}
