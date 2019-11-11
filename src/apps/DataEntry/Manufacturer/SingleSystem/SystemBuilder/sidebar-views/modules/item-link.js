import React from 'react';
import { Link } from 'react-router-dom';
import { parseSearch } from '../../../../../../../utils';

export const ItemLink = ({
    path,
    match: {
        path: matchedPath,
    },
    location: {
        search,
    },
}) => path.match(/__DT__/) ? (
    <Link
        to={`${matchedPath.replace(/build/, 'detail')}${parseSearch(search).update({ path })}`}
        className="sidebar-button empty"
    >
        <button>
            Edit {path.match(/__CT__/) ? "Configuration" : "Detail"}
        </button>
    </Link>
) : null;
