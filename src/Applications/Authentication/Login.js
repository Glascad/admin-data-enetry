import React, {
    useState,
    useEffect,
} from 'react';

import {
    Input,
    TitleBar,
    withContext,
    Ellipsis,
} from '../../components';

import { AuthenticationContext } from './Authentication';

import Statics, { StaticContext } from '../Statics/Statics';

import LoginSplash from '../../assets/images/Login Splash.jpeg';

import './Login.scss';

function Login({
    AUTH: {
        authenticating,
        login,
        logout,
    },
    staticContext,
    staticContext: {
        Viewport,
        sidebar: {
            toggle,
        },
    },
}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        toggle(false);
        return () => toggle(true);
    }, []);

    const submit = () => login({ username, password });

    const submitOnEnter = ({ key }) => key === 'Enter' && submit();

    return (
        <>
            <img
                id="login-splash"
                src={LoginSplash}
            />
            <div className="floating card">
                {authenticating ? (
                    <>
                        <TitleBar
                            title={(
                                <Ellipsis
                                    text="Authenticating"
                                />
                            )}
                        />
                        <button
                            className="empty"
                            onClick={logout}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                        <>
                            <TitleBar
                                title="Login"
                            />
                            <Input
                                label="username"
                                autoFocus={true}
                                value={username}
                                onKeyDown={submitOnEnter}
                                onChange={({ target: { value } }) => setUsername(value)}
                            />
                            <Input
                                label="password"
                                type="password"
                                value={password}
                                onKeyDown={submitOnEnter}
                                onChange={({ target: { value } }) => setPassword(value)}
                            />
                            <div className="bottom-buttons">
                                <button
                                    className="action"
                                    onClick={submit}
                                >
                                    Login
                            </button>
                            </div>
                        </>
                    )}
            </div>
        </>
    );
}

const LoginWithContext = withContext(
    AuthenticationContext,
    ({ context }) => ({ AUTH: context }),
)(
    withContext(
        StaticContext,
        ({ context }) => ({ staticContext: context }),
    )(Login),
);

export default () => (
    <Statics
        routes={{
            Login: LoginWithContext,
        }}
    />
);
