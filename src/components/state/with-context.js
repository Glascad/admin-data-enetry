import React, { Component, PureComponent } from 'react';

export default (contextType, mapProps = p => p, { pure = false } = {}) => (
    ComponentWithoutContext => (
        class ComponentWithContext extends (
            pure ?
                PureComponent
                :
                Component
        ) {

            static contextType = contextType;

            render = () => {

                const {
                    props,
                    context,
                } = this;

                const childProps = {
                    ...props,
                    context,
                };

                return (
                    <ComponentWithoutContext
                        {...childProps}
                        {...(mapProps || (p => p))(childProps)}
                    />
                );
            }
        }
    )
);
