import React from 'react';
import {
    Navigator,
} from '../../../../components';

import DetailView from './DetailView/DetailView';
import ConfigurationView from './ConfigurationView/ConfigurationView';
import PartView from './PartView/PartView';

export default function DetailBuilder() {
    return (
        <Navigator
            routes={{
                DetailView,
                ConfigurationView,
                PartView,
            }}
        />
    );
}
