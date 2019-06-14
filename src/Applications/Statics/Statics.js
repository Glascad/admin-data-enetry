import React, {
    PureComponent,
    createContext,
    createRef,
} from 'react';

import './Statics.scss';

import {
    Link,
    withRouter,
} from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
    DoubleArrow,
    NavMenu,
    Navigator,
    ApolloWrapper,
} from '../../components';
import gql from 'graphql-tag';
import { STORAGE_KEYS } from '../../apollo-config';

export const StaticContext = createContext();

class Statics extends PureComponent {

    state = {
        open: true,
    };

    Viewport = createRef();

    toggle = open => typeof open === 'boolean' ?
        this.setState({ open })
        :
        this.setState({ open: !this.state.open });

    render = () => {
        const {
            state: {
                open,
            },
            props,
            props: {
                match: {
                    path,
                },
                routes,
            },
            toggle,
            getPathTo,
            Viewport,
        } = this;

        return (
            <StaticContext.Provider
                value={{
                    sidebar: {
                        open,
                        toggle,
                    },
                    routes,
                    getPathTo,
                    Viewport,
                }}
            >
                <div id="Sidebar" className={open ? "" : "closed"}>
                    <Link
                        id="sidebar-header"
                        to={path}
                    >
                        <Logo className="logo" />
                        <span>glascad</span>
                    </Link>
                    <NavMenu
                        routeProps={props}
                        routes={routes}
                        closed={!open}
                    />
                    <DoubleArrow
                        onClick={toggle}
                    />
                    <div id="application-links">
                        <Link to="/data-entry">
                            <button className="light">
                                DATA ENTRY
                            </button>
                        </Link>
                        <Link to="/glascad">
                            <button className="light">
                                GLASCAD
                            </button>
                        </Link>
                    </div>
                    <ApolloWrapper
                        query={{
                            query: gql`{
                                currentUser: getCurrentUser{
                                    id
                                    username
                                }
                            }`,
                        }}
                    >
                        {({
                            queryStatus: {
                                currentUser: {
                                    username,
                                } = {},
                            },
                            rawQueryStatus: {
                                refetch,
                            },
                        }) => username ? (
                            <div id="current-user">
                                <div>
                                    {username}
                                </div>
                                <button
                                    className="empty light"
                                    onClick={() => {
                                        localStorage.setItem(STORAGE_KEYS.JWT, '');
                                        refetch();
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </ApolloWrapper>
                </div>
                <div
                    id="viewport"
                    ref={Viewport}
                >
                    <Navigator
                        routes={routes}
                    />
                </div>
            </StaticContext.Provider>
        );
    }
}

export default withRouter(Statics);
