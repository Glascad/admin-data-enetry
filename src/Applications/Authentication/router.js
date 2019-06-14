import { lazy } from 'react';

export default {
    subroutes: {
        Login: lazy(() => import('./Login')),
    },
};
