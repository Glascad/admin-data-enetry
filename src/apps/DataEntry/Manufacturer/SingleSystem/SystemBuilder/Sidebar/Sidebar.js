import React from 'react';
import ItemName from '../sidebar-views/modules/ItemName/ItemName';

const Sidebar = props => (
    <>
        <ItemName
            {...props}
        />
        <ItemChildren
            {...props}
        />
        <BottomButtons
            {...props}
        />
    </>
);

export default Sidebar;
