import React, { useContext, memo } from 'react';

export default (contextType, mapProps = p => p, { pure = false } = {}) => (
    ComponentWithoutContext => (pure ? memo : c => c)(
        function ComponentWithContext(props) {
            const context = useContext(contextType);
            const childProps = {
                ...props,
                context,
            };
            return (
                <ComponentWithoutContext
                    {...childProps}
                    {...mapProps(childProps)}
                />
            );
        }
    )
);
