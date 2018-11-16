import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import routes from '../routes';

import { Dropdown } from '../../components';

class Sidebar extends Component {

    routeRefs = routes.map(createRef);

    closeDropdowns = ({
        target
    }) => this.routeRefs
        .forEach(({
            current
        }) => current !== target ?
                current.open = false
                :
                null);

    goTo = pathname => this.props.history.push(pathname);

    render = () => {
        const {
            props: {
                location: {
                    pathname
                }
            },
            routeRefs,
            handleDropdownClick,
            closeDropdowns,
        } = this;
        return (
            <div id="Sidebar">
                {routes.map(({
                    name,
                    subroutes = [],
                    exact,
                    path: parentPath,
                }, i) => {
                    const filteredSubroutes = subroutes.filter(({ path }) => path[1] !== ':');
                    const selected = exact && !filteredSubroutes.length ?
                        pathname === parentPath
                        :
                        pathname.includes(parentPath);
                    return filteredSubroutes.length ? (
                        <Dropdown
                            key={i}
                            reference={routeRefs[i]}
                            className={selected ? 'selected' : ''}
                            title={name}
                            onSummaryClick={closeDropdowns}
                            children={filteredSubroutes.map(({
                                exact,
                                name,
                                path: childPath
                            }, i) => {
                                const childSelected = exact ?
                                    pathname === parentPath + childPath
                                    :
                                    pathname.includes(parentPath + childPath)
                                return (
                                    <Link
                                        key={i}
                                        to={parentPath + childPath}
                                        className={childSelected ? 'selected' : ''}
                                        children={name}
                                    />
                                )
                            })}
                        />
                    ) : (
                            <Link
                                key={i}
                                ref={routeRefs[i]}
                                to={parentPath}
                                className={`item ${selected ? 'selected' : ''}`}
                                children={name}
                                onClick={closeDropdowns}
                            />
                        );
                })}
            </div>
        );
    }
}

export default withRouter(Sidebar);