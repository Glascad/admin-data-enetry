import React, { Component } from 'react';

export default function asyncComponent(importComponent, FallbackComponent = () => null) {
    var ImportedComponent = FallbackComponent;
    return class AsyncComponent extends Component {
        state = { ImportedComponent };
        componentDidMount = async () => {
            if (ImportedComponent === FallbackComponent) {
                const importedModule = await importComponent();
                ImportedComponent = importedModule.default;
                this.setState({ ImportedComponent });
            }
        }
        render = () => <this.state.ImportedComponent {...this.props} />;
    }
}
