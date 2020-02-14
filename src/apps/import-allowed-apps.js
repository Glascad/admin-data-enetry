import React from 'react';
import { asyncPipe, match } from "../utils";
import Statics from './Statics/Statics';

const DATA_ENTRY = {
    name: 'DataEntry',
    _import: () => import('./DataEntry/DataEntry'),
};
const GLASCAD = {
    name: 'Glascad',
    _import: () => import('./Glascad/Glascad'),
};

const rolePermissions = {
    GC_ADMIN: [GLASCAD, DATA_ENTRY],
    GC_DATA_ENTRY: [DATA_ENTRY],
    GC_CLIENT: [GLASCAD],
    unauthenticated: [],
};

export default (role = '') => asyncPipe(
    role,
    // get allowed application names by role
    role => match(role).against(rolePermissions).otherwise(rolePermissions.unauthenticated),
    // fetch allowed applications
    names => Promise.all(names.map(async ({ name, _import }) => ({
        name,
        module: await _import(),
    }))),
    // organize applications into a single object
    apps => apps.reduce((apps, {
        name,
        module: {
            default: routes,
        },
    }) => ({
        ...apps,
        // wrap applications in Static components
        [name]: props => (
            <Statics
                {...{
                    ...props,
                    routes,
                }}
            />
        ),
    }), null),
);

