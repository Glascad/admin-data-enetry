import React, { useContext, useState } from 'react';
import LoginSplash from '../../../assets/images/Login Splash.jpeg';
import { Ellipsis, Input, TitleBar } from '../../../components';
import { AuthContext } from '../AuthContext';
import './Login.scss';

export default function Login({ loading }) {

    const {
        authenticating,
        login,
        logout,
    } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => login({ username, password });

    const submitOnEnter = ({ key }) => key === 'Enter' && submit();

    return (
        <>
            <img
                id="login-splash"
                src={LoginSplash}
            />
            <div className="floating card">
                {authenticating || loading ? (
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
                                data-cy="username"
                                label="username"
                                autoFocus={true}
                                tabIndex={0}
                                value={username}
                                onKeyDown={submitOnEnter}
                                onChange={({ target: { value } }) => setUsername(value)}
                            />
                            <Input
                                data-cy="password"
                                label="password"
                                type="password"
                                value={password}
                                onKeyDown={submitOnEnter}
                                onChange={({ target: { value } }) => setPassword(value)}
                            />
                            <div className="bottom-buttons">
                                <button
                                    data-cy="login"
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
