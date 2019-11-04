import React from 'react';
import { Link } from 'react-router-dom';
import { parseSearch } from '../../../../utils';
import { useQuery, TitleBar, SVG, Select, Input } from '../../../../components';
import gql from 'graphql-tag';
import F from '../../../../schemas';

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
    const [fetchQuery, queryResult] = useQuery({ query, variables: { id: +partId } });
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
                selections={[mName, partNumber]}
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
