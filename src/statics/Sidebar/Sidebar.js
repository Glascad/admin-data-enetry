import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Sidebar.scss';
import { Link } from 'react-router-dom';

import Dropdown from '../../components/Dropdown/Dropdown';

class Sidebar extends Component {

    routes = [
        {
            name: "SYSTEM",
            subroutes: []
        },
        {
            name: "SYSTEM CONFIGURATIONS",
            subroutes: [
                {
                    name: "SYSTEM TYPES",
                    path: ""
                },
                {
                    name: "DETAIL TYPES",
                    path: ""
                },
                {
                    name: "CONFIGURATION TYPES",
                    path: ""
                },
                {
                    name: "PART TYPES",
                    path: ""
                }
            ]
        },
        {
            name: "SETTINGS",
            subroutes: [
                {
                    name: "MANUFACTURERS",
                    path: ""
                },
                {
                    name: "LINETYPES",
                    path: ""
                },
                {
                    name: "PART ORIENTATIONS",
                    path: ""
                },
                {
                    name: "FASTENERS",
                    path: ""
                },
                {
                    name: "INFILL SIZES",
                    path: ""
                },
                {
                    name: "INFILL TYPES",
                    path: ""
                },
            ]
        }
    ];


    render = () => {
        const {
            routes,
            closeOtherTabs
        } = this;

        return (
            <div id="Sidebar">
                <header>HOME</header>
                {routes.map(({ name, subroutes }, i) => (
                    <Dropdown
                        title={name}
                        content={subroutes}
                        onClick={closeOtherTabs}
                        renderChild={({ name, path }, i) => (
                            <Link
                                to={path}
                                children={name}
                                key={i}
                            />
                        )}
                    />
                ))}
            </div>
        );
    }
}

export default withRouter(Sidebar);