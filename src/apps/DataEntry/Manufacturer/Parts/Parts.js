import React from 'react';
import { Navigator, TitleBar, useQuery, Pill, SVG, CircleButton, ListWrapper } from '../../../../components';
import ImportParts from './ImportParts';
import './Parts.scss';
import F from '../../../../schemas';
import gql from 'graphql-tag';
import { parseSearch } from '../../../../utils';

export default function Parts({ _manufacturer }) {
    return (
        <Navigator
            routeProps={{ _manufacturer }}
            routes={{
                AllParts,
                ImportParts,
            }}
        />
    );
}

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

function AllParts({
    match: {
        path,
    },
    location: {
        search,
    },
    history,
    _manufacturer: {
        id,
        name,
    } = {},
}) {
    console.log(arguments[0]);
    const { manufacturerId } = parseSearch(search);
    const [fetchQuery, queryResult, fetching] = useQuery({ query, variables: { id: +manufacturerId } });
    console.log({ queryResult });
    const { allParts = [] } = queryResult;
    return (
        <>
            <div
                id="Parts"
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
                    title={"Parts"}
                    selections={[name]}
                />
                <ListWrapper
                    items={allParts.map(({ partNumber, paths }) => ({
                        title: partNumber,
                        type: "tile",
                        align: "left",
                        children: (
                            <SVG paths={paths} />
                        ),
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
