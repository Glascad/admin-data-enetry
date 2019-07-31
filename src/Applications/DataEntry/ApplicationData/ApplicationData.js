import React from 'react';

import {
    Navigator,
} from '../../../components';

import Manufacturers from './Manufacturers/Manufacturers';
// import Types from './Types/Types';
// import SystemTags from './SystemTags/SystemTags';
// import Parts from './Parts/Parts';
// import Lines from './Lines/Lines';
// import Infills from './Infills/Infills';

const subroutes = {
    Manufacturers,
    // Types,
    // SystemTags,
    // Parts,
    // Infills,
    // Lines,
};

ApplicationData.navigationOptions = {
    subroutes,
};

export default function ApplicationData() {
    return (
        <Navigator
            routes={subroutes}
        />
    );
}
