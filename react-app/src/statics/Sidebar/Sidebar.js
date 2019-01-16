import React, { Component } from 'react';
import './Sidebar.scss';
import {
    Link,
    NavLink,
    withRouter,
} from 'react-router-dom';
// import routes from '../../routes/routes';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
    Dropdown,
    DoubleArrow,
} from '../../components';

import routes from '../../routes/routes';

import parseSearch from '../../utils/search-parser';

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

        // const systemNID = pathname.replace(/^\/system\/(.*)\/.*$/, '$1');
        const { systemNID } = parseSearch(search);

        console.log({ systemNID });

        return (
            <div id="Sidebar" className={open ? "" : "closed"}>
                <div id="sidebar-header">
                    <Logo className="logo" />
                    <span>GLASCAD</span>
                </div>
                {routes.map(({
                    name,
                    path,
                    subroutes = []
                }, i) => subroutes.length ? (
                    <Dropdown
                        key={i}
                        title={name}
                        open={pathname.match(new RegExp(`^${path}/`)) || undefined}
                        className={
                            pathname.match(new RegExp(`^${path}/`)) ?
                                'selected'
                                :
                                ''
                            // i - 1 === selectedDropdown ? 'selected' : ''
                        }
                    >
                        {subroutes.map(({ name: childName, path: childPath }, j) => (
                            <NavLink
                                key={j}
                                // n={console.log(`${url.replace(/^\//, "")}${path}${childPath}`)}
                                // isActive={(_, { pathname }) => pathname == `${url.replace(/^\//, "")}${path}${childPath}`}
                                isActive={(_, { pathname }) => pathname.includes(`${path}${childPath}`)}
                                to={`${
                                    path
                                    }${
                                    // !systemNID.match(/^[a-z\-]*$/) ?
                                    childPath // .replace(/:systemNID/, systemNID)
                                    // :
                                    // '/select-system'
                                    }${
                                    search
                                    }`}
                                activeClassName="selected"
                            >
                                {childName}
                            </NavLink>
                        ))}
                    </Dropdown>
                ) : (
                            // <NavLink
                            <Link
                                key={i}
                                // exact={true}
                                className="item"
                                to={`${
                                    path
                                    }${
                                    search}`}
                                // activeClassName="selected"
                            >
                                {name}
                            </Link>
                            // </NavLink>
                        ))}
                {/* <div className="item sidebar-toggle">
                    <DoubleArrow
                        onClick={toggle}
                    />
                </div> */}
            </div>
        );
    }
}

export default withRouter(Sidebar);
