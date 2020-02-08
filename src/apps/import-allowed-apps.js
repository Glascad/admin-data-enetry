import React from 'react';
import { asyncPipe, match } from "../utils";
import Statics from './Statics/Statics';

const DE = 'DataEntry';
const GC = 'Glascad';

const rolePermissions = {
    GC_ADMIN: [DE, GC],
    GC_DATA_ENTRY: [DE],
    GC_CLIENT: [GC],
    unauthenticated: [
        // GC,
        // DE,
    ],
};

export default role => asyncPipe(
    role,
    // get allowed application names by role
    role => match(role).against(rolePermissions).otherwise(rolePermissions.unauthenticated),
    // fetch allowed applications
    names => Promise.all(names.map(async name => ({
        name,
        module: await import(`./${name}/${name}`),
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

