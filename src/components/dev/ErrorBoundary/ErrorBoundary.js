import { PureComponent } from 'react';

export default class ErrorBoundary extends PureComponent {
    static getDerivedStateFromError(error, info) {
        console.error({ error, info });
        return {
            error,
            info,
        };
    }
    state = {};
    componentDidCatch = (error, info) => {
        console.error({ error, info });
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
