import React from 'react';
import { Link } from 'react-router-dom';
import { parseSearch, match } from '../../../../../../../utils';

const ItemLink = ({
    selectedItem: {
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
            Edit {path.match(/__CT__/) ?
                "Configuration"
                :
                "Detail"
            }
        </button>
    </Link>
) : null;

export default ItemLink;
