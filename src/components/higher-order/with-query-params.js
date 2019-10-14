import React, {
    memo,
    // useEffect,
    // useContext,
} from 'react';
import {
    withRouter,
    Redirect,
    // useLocation,
    // useHistory,
} from 'react-router-dom';
import { parseSearch } from '../../utils';

const withQueryParams = ({ required = {}, optional = {} }, getFallbackPath) => Component => withRouter(memo(props => {

    const {
        match: {
            path,
        },
        location: {
            search,
        },
    } = props;

    // const { path, search } = useLocation();

    const parsed = parseSearch(search);

    const requiredEntries = Object.entries(required);
    const optionalEntries = Object.entries(optional);

    const {
        __failed__,
        ...params
    } = requiredEntries
        .reduce((params, [key, map = val => val]) => {
            const provided = parsed[key]
            const mapped = map(provided);
            const { __failed__ } = params;
            return {
                ...params,
                ...(mapped ? {
                    [key]: mapped,
                } : {
                        __failed__: {
                            ...__failed__,
                            [key]: provided,
                        },
                    }),
            };
        }, optionalEntries
            .reduce((params, [key, map = val => val]) => ({
                ...params,
                [key]: map(parsed[key]),
            }), {}));

    return __failed__ ? (
        <Redirect
            {...console.error({ __failed__ })}
            to={getFallbackPath({
                __failed__,
                params,
                parsed,
                path,
                search,
            })}
        />
    ) : (
            <Component
                {...props}
                params={params}
            />
        );
}));

export default withQueryParams;

// withQueryParams.hook = (requiredParams, getFallbackPath) => {
//     const parsed = parseSearch(search);

//     const requiredEntries = Object.entries(requiredParams);

//     const {
//         __failed__,
//         ...queryParams
//     } = requiredEntries.reduce((params, [key, map = val => val]) => {
//         const provided = parsed[key]
//         const mapped = map(provided);
//         const { __failed__ } = params;
//         return {
//             ...params,
//             ...(mapped ? {
//                 [key]: mapped,
//             } : {
//                     __failed__: {
//                         ...__failed__,
//                         [key]: provided,
//                     },
//                 }),
//         };
//     }, {});

//     const history = useHistory();
//     const { path, search } = useLocation();

//     useEffect(() => {
//         if (__failed__) history.push(getFallbackPath({ path, search, parsed, __failed__ }));
//     });

//     return queryParams;
// }
