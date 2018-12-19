import React, { Component } from 'react';
import './Sidebar.scss';
import { NavLink, withRouter } from 'react-router-dom';
// import routes from '../../routes/routes';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Dropdown } from '../../components';

// function checkElementForClass(className, element) {
//     const regex = new RegExp(`(^| )${className}( |$)`);
//     if (
//         element.className
//         &&
//         element.className.match(regex)
//     ) {
//         return true;
//     } else if (
//         element.childNodes
//         &&
//         element.childNodes.length
//     ) {
//         return [...element.childNodes].some(element => checkElementForClass(className, element));
//     } else {
//         return false;
//     }
// }

// function checkChildrenForClass(className, element) {
//     if (
//         element.childNodes
//         &&
//         element.childNodes.length
//     ) {
//         return [...element.childNodes].some(childNode => checkElementForClass(className, childNode));
//     }
// }

class Sidebar extends Component {

    // state = {
    //     selectedDropdown: -1
    // };

    // componentDidMount = () => {
    //     this.componentDidUpdate({ location: {} });
    // };

    // componentDidUpdate = ({ location: { pathname } }) => {
    //     if (pathname !== this.props.location.pathname) {
    //         const dropdowns = [...document.querySelectorAll("#Sidebar .Dropdown")];
    //         const selectedDropdown = dropdowns.findIndex((dropdown, i) => checkChildrenForClass('selected', dropdown));
    //         if (selectedDropdown !== this.state.selectedDropdown) {
    //             this.setState({
    //                 selectedDropdown
    //             });
    //         }
    //     }
    // }

    render = () => {
        const {
            // state: {
            //     selectedDropdown
            // },
            props: {
                location: {
                    pathname
                }
            }
        } = this;

        const systemNID = pathname.replace(/^.*\/(.+)/, '$1');

        return (
            <div id="Sidebar">
                <div id="sidebar-header">
                    <Logo className="logo" />
                    GLASCAD
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
            </div>
        );
    }
}

export default withRouter(Sidebar);


const links = [
    {
        text: "Activity",
        link: "/",
    },
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
                link: "/system-info/:systemNID",
            },
            {
                text: "Glazing Info",
                link: "/glazing-info/:systemNID",
            },
            {
                text: "Valid Types",
                link: "/valid-types/:systemNID",
            },
            // {
            //     text: "System Compatibility",
            //     link: "/system-compatibility/:systemNID",
            // },
            {
                text: "System Options",
                link: "/system-options/:systemNID",
            },
            {
                text: "Invalid Combinations",
                link: "/invalid-combinations/:systemNID",
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
