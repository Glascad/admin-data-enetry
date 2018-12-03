import React from 'react';
import CRUDWrapper from '../CRUDWrapper/CRUDWrapper';

export default ({
    query,
    create = {},
    update = {},
    _delete = {},
},
    mapProps = CRUD => ({ CRUD })
) => (
    WrappedComponent
) => (
            props => (
                <CRUDWrapper
                    {...{
                        query,
                        create,
                        update,
                        _delete,
                    }}
                >
                    {CRUDprops => (
                        <WrappedComponent
                            {...props}
                            {...mapProps(CRUDprops)}
                        />
                    )}
                </CRUDWrapper>
            )
        );