import React from 'react';
import { Link } from 'react-router-dom';
import { parseSearch, match } from '../../../../../../../utils';

const ItemLink = ({
    item: {
        path = '',
    } = {},
    match: {
        path: matchedPath = '',
    },
    location: {
        search = '',
    },
}) => path.match(/__DT__/) ? (
    <Link
        to={`${matchedPath.replace(/build/, 'detail')}${parseSearch(search).update({ path })}`}
        className="sidebar-button empty"
    >
        <button
            data-cy="detail-builder-link"
        >
                Edit {match(path)
                    .regex(/__PT__/, "Part")
                    .regex(/__CT__/, "Configuration")
                .otherwise("Detail")}
        </button>
    </Link>
) : null;

export default ItemLink;
