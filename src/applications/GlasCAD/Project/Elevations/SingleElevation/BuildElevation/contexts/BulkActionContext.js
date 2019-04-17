import React, { PureComponent, createContext } from 'react';

export const BulkActionContext = createContext();

export default class BulkActionProvider extends PureComponent {

    

    render = () => {
        const { 
            props: {
                children,
                elevation,
                updateElevation,
            },
        } = this;

        return (
            <BulkActionContext.Provider
                value={{

                }}
            >
                {children}
            </BulkActionContext.Provider>
        );
    }
}
