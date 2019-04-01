import React, { Component } from 'react';

export default (ContextType, mapProps = p => p) => ComponentWithoutContext => class ComponentWithContext extends Component {

    static contextType = ContextType;

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
                {...mapProps(childProps)}
            />
        );
    }
}
