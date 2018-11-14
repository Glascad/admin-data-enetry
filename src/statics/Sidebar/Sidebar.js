import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import routes from '../Viewport/routes/routes';

import Dropdown from '../../components/Dropdown/Dropdown';

class Sidebar extends Component {

    routeRefs = routes.slice(1).map(createRef);

    closeDropdowns = ({ target } = {}) => this.routeRefs.forEach(({ current }) => current !== target ? current.open = false : null);

    goTo = pathname => this.props.history.push(pathname);

    handleDropdownClick = path => e => {
        this.closeDropdowns(e);
        this.goTo(path);
    }

    render = () => {
        const {
            props: {
                location: {
                    pathname
                }
            },
            routeRefs,
            handleDropdownClick,
        } = this;
        return (
            <div id="Sidebar">
                <header
                    className={`header ${pathname === '/' ? 'selected' : ''}`}
                    onClick={handleDropdownClick('/')}
                >
                    HOME
                </header>
                {routes.slice(1).map(({ name, subroutes, path: parentPath }, i) => (
                    <Dropdown
                        key={i}
                        reference={routeRefs[i]}
                        className={pathname.includes(parentPath) ? 'selected' : ''}
                        title={name}
                        onSummaryClick={handleDropdownClick(parentPath)}
                        children={subroutes ? subroutes.map(({ name, path: childPath }, i) => (
                            <Link
                                key={i}
                                to={parentPath + childPath.slice(1)}
                                children={name}
                            />
                        )) : null}
                    />
                ))}
            </div>
        );
    }
}

export default withRouter(Sidebar);