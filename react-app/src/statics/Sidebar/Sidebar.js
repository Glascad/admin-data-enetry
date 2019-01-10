import React, { Component } from 'react';
import './Sidebar.scss';
import { NavLink, withRouter } from 'react-router-dom';
// import routes from '../../routes/routes';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
    Dropdown,
    DoubleArrow,
} from '../../components';

import { links as systemLinks } from '../../routes/System/System';
import { links as settingsLinks } from '../../routes/Settings/Settings';
import parseSearch from '../../utils/search-parser';

const links = [
    // homeLinks,
    systemLinks,
    settingsLinks,
];

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
                {links.map(({ text, link, subroutes = [] }, i) => subroutes.length ? (
                    <Dropdown
                        key={i}
                        title={text}
                        open={pathname.match(new RegExp(`^${link}/`)) || undefined}
                        className={
                            pathname.match(new RegExp(`^${link}/`)) ?
                                'selected'
                                :
                                ''
                            // i - 1 === selectedDropdown ? 'selected' : ''
                        }
                    >
                        {subroutes.map(({ text: childText, link: childLink }, j) => (
                            <NavLink
                                key={j}
                                // n={console.log(`${url.replace(/^\//, "")}${link}${childLink}`)}
                                // isActive={(_, { pathname }) => pathname == `${url.replace(/^\//, "")}${link}${childLink}`}
                                isActive={(_,{pathname})=>pathname.includes(`${link}${childLink}`)}
                                to={`${
                                    link
                                    }${
                                    // !systemNID.match(/^[a-z\-]*$/) ?
                                    childLink // .replace(/:systemNID/, systemNID)
                                    // :
                                    // '/select-system'
                                    }${
                                    search
                                    }`}
                                activeClassName="selected"
                            >
                                {childText}
                            </NavLink>
                        ))}
                    </Dropdown>
                ) : (
                        <NavLink
                            key={i}
                            exact={true}
                            className="item"
                            to={`${
                                link
                                }${
                                search}`}
                            activeClassName="selected"
                        >
                            {text}
                        </NavLink>
                    ))}
                <div className="item sidebar-toggle">
                    <DoubleArrow
                        onClick={toggle}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);
