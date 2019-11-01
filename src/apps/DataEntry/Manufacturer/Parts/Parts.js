import React from 'react';
import { Navigator } from '../../../../components';
import AllParts from './AllParts';
import ImportParts from './ImportParts';
import './Parts.scss';
import PartInfo from './PartInfo';

export default function Parts({ _manufacturer }) {
    return (
        <Navigator
            routeProps={{ _manufacturer }}
            routes={{
                AllParts,
                ImportParts,
                PartInfo,
            }}
        />
    );
}
