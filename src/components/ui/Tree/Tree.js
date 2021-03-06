import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Tree.scss';
import Ellipsis from '../Ellipsis/Ellipsis';
import useInitialState from '../../hooks/use-initial-state';

Branch.propTypes = {
    item: PropTypes.object.isRequired,
    branches: PropTypes.array,
    depth: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    // toggleOpen: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
};

function Branch({
    item,
    parent,
    branches = [],
    depth,
    open: propsOpen = true,
    // toggleOpen,
    renderItem,
    identifier = 'key',
}) {
    const [open, setOpen] = useInitialState(propsOpen);
    const toggleOpen = () => setOpen(o => !o);
    return (
        <div
            className={`Branch depth-${depth}`}
        >
            {renderItem(item, { depth, open, toggleOpen, parent })}
            <div
                className="tree-branches"
            >
                {branches.length ?
                    open ?
                        branches.map((branch, i) => (
                            <Branch
                                key={branch[identifier] || i}
                                parent={item}
                                // open={!open}
                                {...branch}
                                renderItem={renderItem}
                                depth={depth + 1}
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
                depth={0}
                renderItem={renderItem}
            />
        </div>
    );
}
