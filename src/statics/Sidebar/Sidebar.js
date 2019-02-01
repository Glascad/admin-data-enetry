import React, { Component } from 'react';

import gql from 'graphql-tag';

import './Sidebar.scss';

import {
    Link,
    withRouter,
} from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
    DoubleArrow,
    NavMenu,
    ApolloWrapper,
} from '../../components';

import {
    parseSearch,
} from '../../utils';

import routes from '../../routes/routes';

class Sidebar extends Component {

    state = {
        open: true,
    };

    toggle = () => this.setState({
        open: !this.state.open,
    });

    render = () => {
        const {
            state: {
                open,
            },
            props: {
                location: {
                    search,
                },
            },
            toggle,
        } = this;

        const { systemNID } = parseSearch(search);

        return (
            <ApolloWrapper
                query={{
                    query: gql`query System($systemNID:ID!){
                        system(nodeId:$systemNID){
                            nodeId
                            id
                            name
                        }
                    }`,
                    variables: {
                        systemNID,
                    },
                }}
            >
                {
                    apollo => (
                        <div id="Sidebar" className={open ? "" : "closed"}>
                            <Link
                                id="sidebar-header"
                                to="/"
                            >
                                <Logo className="logo" />
                                <span>GLASCAD</span>
                            </Link>
                            <DoubleArrow
                                onClick={toggle}
                            />
                            <NavMenu
                                routeProps={{
                                    ...apollo,
                                    systemNID,
                                }}
                                routes={routes}
                                closed={!open}
                            />
                        </div>
                    )
                }
            </ ApolloWrapper >
        );
    }
}

export default withRouter(Sidebar);
