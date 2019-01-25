import React from 'react';

import {
    TabNavigator,
} from '../../../components';

import PartTypes from './PartTypes/PartTypes';
import Orientations from './Orientations/Orientations';
import PartTags from './PartTags/PartTags';

export default function Parts() {
    return (
        <TabNavigator
            routes={[
                {
                    name: "Part Types",
                    path: "/types",
                    component: PartTypes
                },
                {
                    name: "Part Tags",
                    path: "/tags",
                    component: PartTags,
                },
                {
                    name: "Part Orientations",
                    path: "/orientations",
                    component: Orientations,
                },
            ]}
        />
    );
}
