import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Tree.scss';
import Ellipsis from '../Ellipsis/Ellipsis';
import useInitialState from '../../hooks/use-initial-state';

Branch.propTypes = {
    item: PropTypes.object.isRequired,
    branches: PropTypes.array,
    level: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
};

function Branch({
    item,
    branches = [],
    level = 0,
    open: propsOpen = true,
    // toggleOpen,
    renderItem,
}) {
    const [open, setOpen] = useInitialState(propsOpen);
    const toggleOpen = () => setOpen(o => !o);
    return (
        <div
            className={`Branch level-${level}`}
        >
            <div
                className="tree-item"
                onClick={toggleOpen}
            >
                {renderItem(item, arguments[0])}
            </div>
            <div
                className="tree-branches"
            >
                {branches.length ?
                    open ?
                        branches.map((branch, i) => (
                            <Branch
                                key={i}
                                open={!open}
                                {...branch}
                                renderItem={renderItem}
                                level={level + 1}
                            />
                        )) : (
                            <Ellipsis
                                timeout={false}
                            />
                        ) : null}
            </div>
        </div>
    );
}

Tree.propTypes = {
    trunk: PropTypes.shape(Branch.propTypes).isRequired,
    renderItem: PropTypes.func.isRequired,
};

export default function Tree({ trunk, renderItem }) {
    return (
        <div className="Tree">
            <Branch
                {...trunk}
                renderItem={renderItem}
            />
        </div>
    );
}
