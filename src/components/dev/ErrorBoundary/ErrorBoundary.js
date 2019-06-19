import { PureComponent } from 'react';

export default class ErrorBoundary extends PureComponent {
    state = {};
    componentDidCatch = (error, info) => {
        console.error({ error, info });
        this.setState({ error, info });
    }
    render = () => {
        const {
            state: {
                error,
                info,
            },
            props: {
                renderError,
                children,
            },
        } = this;
        return error ? renderError(error, info) : children;
    }
}
