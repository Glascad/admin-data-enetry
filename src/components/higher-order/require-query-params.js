import React, { memo } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { parseSearch } from '../../utils';

export default (requiredParams, getFallbackPath) => Component => withRouter(memo(props => {

    const {
        match: {
            path,
        },
        location: {
            search,
        },
    } = props;

    const parsed = parseSearch(search);

    const requiredEntries = Object.entries(requiredParams);

    const {
        __failed__,
        ...queryParams
    } = requiredEntries.reduce((params, [key, map = val => val]) => {
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
    }, {});

    return __failed__ ? (
        <Redirect
            {...console.error({ __failed__ })}
            to={getFallbackPath({
                __failed__,
                queryParams,
                parsed,
                path,
                search,
            })}
        />
    ) : (
            <Component
                {...props}
                queryParams={queryParams}
            />
        );
}));
