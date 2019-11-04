import React from 'react';
import { Link } from 'react-router-dom';
import { TitleBar, useQuery, SVG, ListWrapper, Ellipsis } from '../../../../components';
import './Parts.scss';
import F from '../../../../schemas';
import gql from 'graphql-tag';
import { parseSearch } from '../../../../utils';

const query = gql`query partsByManufacturer($id: Int!) {
    allParts(condition: {
        manufacturerId: $id
    }) {
        nodes {
            ...PartFields
        }
    }
}
${F.MNFG.PART_FIELDS}
`;

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
    const [fetchQuery, queryResult, fetching] = useQuery({
        query,
        variables: {
            id: +manufacturerId,
        },
        fetchPolicy: shouldRefetch ? "no-cache" : "cache-first",
    });
    console.log({ queryResult });
    const { allParts = [] } = queryResult;
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
                    selections={[
                        fetching ?
                            <Ellipsis />
                            :
                            name,
                    ]}
                />
                <ListWrapper
                    items={allParts.map(({ partNumber, paths, id }) => ({
                        title: partNumber,
                        type: "tile",
                        align: "left",
                        children: (
                            <SVG
                                className="part-preview"
                                paths={paths}
                            />
                        ),
                        hoverButtons: [{
                            children: (
                                <Link
                                    to=""
                                >
                                    Load
                                </Link>
                            ),
                        }, {
                            children: (
                                <Link
                                    to={`${path.replace(/all/, 'info')}${parseSearch(search).update({ partId: id })}`}
                                >
                                    Info
                                </Link>
                            ),
                        }, {
                            text: "Delete",
                            className: "danger",
                        }],
                    }))}
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
