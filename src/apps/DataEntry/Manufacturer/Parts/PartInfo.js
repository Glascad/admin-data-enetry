import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, SVG, TitleBar, useApolloQuery } from '../../../../components';
import F from '../../../../schemas';
import { parseSearch } from '../../../../utils';

PartInfo.navigationOptions = {
    path: "/info",
    requiredURLParams: ["partId"],
};

const query = gql`
    query PartById($id: Int!) {
        partById(id: $id) {
            ...PartFields
        }
    }
    ${F.MNFG.PART_FIELDS}
`;

export default function PartInfo({
    match: {
        path,
    },
    location: {
        search,
    },
    _manufacturer: {
        name: mName,
    } = {}
}) {
    console.log(arguments[0]);
    const { partId } = parseSearch(search);
    const queryResult = useApolloQuery(query, { variables: { id: +partId } });
    console.log({ queryResult });
    const {
        _part: {
            partNumber,
            paths,
            orientation,
        } = {},
    } = queryResult;
    const CLOSE_BUTTON = (
        <Link
            to={`${path.replace(/info/, 'all')}${search}`}
        >
            <button>
                Close
            </button>
        </Link>
    );
    return (
        <>
            <TitleBar
                title="Part Info"
                snailTrail={[mName, partNumber]}
                right={CLOSE_BUTTON}
            />
            <div
                id="PartInfo"
                className="card"
            >
                <Input
                    label="Part Number"
                    value={partNumber}
                    readOnly={true}
                />
                <Select
                    label="Orientation"
                    value={orientation}
                    readOnly={true}
                />
                <SVG
                    dataCy={`svg-${partId}`}
                    className="part-preview"
                    paths={paths}
                />
                <div className="bottom-buttons">
                    {CLOSE_BUTTON}
                </div>
            </div>
        </>
    );
}
