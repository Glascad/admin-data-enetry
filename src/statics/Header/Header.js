import React from 'react';
import { withRouter } from 'react-router-dom';
import './Header.scss';
import { ReactComponent as Logo } from '../../logo.svg';

function Header() {
    return (
        <header id="Header">
            <div>
                <Logo className="logo" />
                <span>GLASCAD ADMIN PANEL</span>
            </div>
        </header>
    );
}

export default withRouter(Header);