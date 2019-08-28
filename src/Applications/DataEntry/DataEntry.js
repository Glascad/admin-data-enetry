import React from 'react';

import Statics from '../Statics/Statics';

import Activity from './Activity/Activity';
import SystemData from './SystemData/SystemData';
import ApplicationData from './ApplicationData/ApplicationData';
import PartData from './PartData/PartData';

export default function DataEntry() {
    return (
        <Statics
            routes={{
                Activity,
                SystemData,
                ApplicationData,
                PartData,
            }}
        />
    );
}
