import React, { Component } from 'react';
import './Sidebar.scss';
import { NavLink, withRouter } from 'react-router-dom';
// import routes from '../../routes/routes';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
    Dropdown,
    DoubleArrow,
} from '../../components';

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
                    pathname
                }
            },
            toggle,
        } = this;

        const systemNID = pathname.replace(/^\/system\/(.*)\/.*$/, '$1');

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
                                to={`${
                                    link
                                    }${
                                    // !systemNID.match(/^[a-z\-]*$/) ?
                                    childLink.replace(/:systemNID/, systemNID)
                                    // :
                                    // '/select-system'
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
                            to={link}
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


const links = [
    // {
    //     text: "Activity",
    //     link: "/",
    // },
    {
        text: "System",
        link: "/system",
        subroutes: [
            {
                text: "Select System",
                link: "/select-system",
            },
            {
                text: "System Info",
                link: "/:systemNID/system-info",
            },
            {
                text: "Glazing Info",
                link: "/:systemNID/glazing-info",
            },
            {
                text: "Valid Types",
                link: "/:systemNID/valid-types",
            },
            // {
            //     text: "System Compatibility",
            //     link: "/:systemNID/system-compatibility",
            // },
            {
                text: "System Options",
                link: "/:systemNID/system-options",
            },
            {
                text: "Invalid Combinations",
                link: "/:systemNID/invalid-combinations",
            },
        ]
    },
    {
        text: "System Configurations",
        link: "/system-configurations",
        subroutes: [
            {
                text: "System Types",
                link: "/system-types",
            },
            {
                text: "System Tags",
                link: "/system-tags",
            },
            {
                text: "Detail Types",
                link: "/detail-types",
            },
            {
                text: "Configuration Types",
                link: "/configuration-types",
            },
            {
                text: "Part Types",
                link: "/part-types",
            },
            {
                text: "Part Tags",
                link: "/part-tags",
            },
        ]
    },
    {
        text: "Settings",
        link: "/settings",
        subroutes: [
            {
                text: "Manufacturers",
                link: "/manufacturers",
            },
            {
                text: "Linetypes",
                link: "/linetypes",
            },
            {
                text: "Part Orientations",
                link: "/part-orientations",
            },
            {
                text: "Infill Sizes",
                link: "/infill-sizes",
            },
            {
                text: "Infill Types",
                link: "/infill-types",
            },
        ]
    },
    // {
    //     text: "Practice",
    //     link: "/practice",
    // }
];
