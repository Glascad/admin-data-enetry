import React, { Component } from 'react';

import gql from 'graphql-tag';

import './Sidebar.scss';

import {
    Link,
    NavLink,
    withRouter,
} from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
    // DoubleArrow,
    NavMenu,
    ApolloWrapper,
} from '../../components';

import {
    parseSearch,
} from '../../utils';

import routes from '../../routes/routes';

// import SystemLink from './SystemLink';

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
                    pathname,
                    search,
                },
                match: {
                    url
                }
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
                            manufacturerByManufacturerId{
                                nodeId
                                id
                                name
                            }
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
                            <div id="sidebar-header">
                                <Logo className="logo" />
                                <span>GLASCAD</span>
                            </div>
                            <NavMenu
                                {...apollo}
                                routes={routes}
                            />
                            {/* <div className="item sidebar-toggle">
                            <DoubleArrow
                            onClick={toggle}
                            />
                        </div> */}
                        </div>
                    )
                }
            </ ApolloWrapper >
        );
    }
}

export default withRouter(Sidebar);
