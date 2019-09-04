import React from 'react';
import { RightSidebar } from '../../../../../components';

import * as VIEWS from './views';

export default function Sidebar({
    selectedItem,
    selectedItem: {
        __typename = '',
    } = {},
    selectItem,
}) {
    return (
        <RightSidebar
            open={!!selectedItem}
            handleCloseClick={() => selectItem()}
            View={VIEWS[__typename] || { title: '', component: () => null }}
            childProps={arguments[0]}
        />
    );
}
