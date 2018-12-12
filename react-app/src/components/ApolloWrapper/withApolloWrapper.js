import React from 'react';
import ApolloWrapper from './ApolloWrapper';

export default ({
    query,
    create = {},
    update = {},
    _delete = {},
},
    mapProps = apollo => ({ apollo })
) => (
    WrappedComponent
) => (
            props => (
                <ApolloWrapper
                    {...{
                        query,
                        create,
                        update,
                        _delete,
                    }}
                >
                    {apolloProps => (
                        <WrappedComponent
                            {...props}
                            {...mapProps(apolloProps)}
                        />
                    )}
                </ApolloWrapper>
            )
        );