import React, { memo } from 'react';
import { getLastItemFromPath } from '../../../../../../app-logic/system-utils';
import { CollapsibleTitle } from '../../../../../../components';
import { normalCase } from '../../../../../../utils';

export default memo(function ChildList({
    children,
    configurationType,
    selectItem,
    selectedItem,
}) {
    return (
        <CollapsibleTitle
            title={configurationType ? "Parts" : "Configurations"}
        >
            <div className="sidebar-list">
                {children.map(item => {
                    const { path } = item;
                    const selected = item === selectedItem;
                    const name = getLastItemFromPath(path);
                    const normalName = configurationType ?
                        name
                        :
                        normalCase(name);
                    console.log({
                        item,
                        selected,
                        name,
                        normalName,
                    });
                    return (
                        <button
                            className={`sidebar-list-item ${selected ? 'selected' : ''}`}
                            onClick={() => selectItem(item)}
                        >
                            {normalName}
                        </button>
                    );
                })}
            </div>
        </CollapsibleTitle>
    );
})
