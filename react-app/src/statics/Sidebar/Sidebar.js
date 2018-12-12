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
        return (
            <div id="Sidebar">
                <div id="sidebar-header">
                    <Logo className="logo" />
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
                                to={link + childLink.replace(/:systemNID/, 'WyJzeXN0ZW1zIiwxXQ==')}
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
                            to={link}
                            className="item"
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
        text: "HOME",
        link: "/",
    },
    {
        text: "SYSTEM",
        link: "/system",
        subroutes: [
            {
                text: "SELECT SYSTEM",
                link: "/select-system",
            },
            {
                text: "SYSTEM INFO",
                link: "/system-info/:systemNID",
            },
            {
                text: "GLAZING INFO",
                link: "/glazing-info/:systemNID",
            },
            {
                text: "VALID TYPES",
                link: "/valid-types/:systemNID",
            },
            {
                text: "SYSTEM COMPATIBILITY",
                link: "/system-compatibility/:systemNID",
            },
            {
                text: "SYSTEM OPTIONS",
                link: "/system-options/:systemNID",
            },
            {
                text: "INVALID COMBINATIONS",
                link: "/invalid-combinations/:systemNID",
            },
        ]
    },
    {
        text: "SYSTEM CONFIGURATIONS",
        link: "/system-configurations",
        subroutes: [
            {
                text: "SYSTEM TYPES",
                link: "/system-types",
            },
            {
                text: "SYSTEM TAGS",
                link: "/system-tags",
            },
            {
                text: "DETAIL TYPES",
                link: "/detail-types",
            },
            {
                text: "CONFIGURATION TYPES",
                link: "/configuration-types",
            },
            {
                text: "PART TYPES",
                link: "/part-types",
            },
            {
                text: "PART TAGS",
                link: "/part-tags",
            },
        ]
    },
    {
        text: "SETTINGS",
        link: "/settings",
        subroutes: [
            {
                text: "MANUFACTURERS",
                link: "/manufacturers",
            },
            {
                text: "LINETYPES",
                link: "/linetypes",
            },
            {
                text: "PART ORIENTATIONS",
                link: "/part-orientations",
            },
            {
                text: "INFILL SIZES",
                link: "/infill-sizes",
            },
            {
                text: "INFILL TYPES",
                link: "/infill-types",
            },
        ]
    },
    {
        text: "PRACTICE",
        link: "/practice",
    }
];
