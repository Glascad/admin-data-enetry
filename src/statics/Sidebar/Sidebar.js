import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import routes from '../Viewport/routes/routes';

import Dropdown from '../../components/Dropdown/Dropdown';

class Sidebar extends Component {

    render = () => {
        const {
            props: {
                location: {
                    pathname
                }
            }
        } = this;
        return (
            <div id="Sidebar">
                <Link to="/" className={`header ${pathname === '/' ? 'selected' : ''}`} ><header>HOME</header></Link>
                {routes.map(({ name, subroutes, path }, i) => (
                    <Dropdown
                        className={pathname.includes(name.toLowerCase().replace(/ /, '') + '/') ? 'selected' : ''}
                        title={<Link
                            to={path}
                            children={name}
                        />}
                        content={subroutes}
                        key={i}
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