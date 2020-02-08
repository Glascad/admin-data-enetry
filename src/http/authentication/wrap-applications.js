import React from 'react';
import Statics from '../../apps/Statics/Statics';

export default applications => applications.reduce((apps, {
    name,
    module: {
        default: routes
    }
}) => ({
    ...apps,
    [name]: props => (
        <Statics
            {...props}
            routes={routes}
        />
    )
}), null);
