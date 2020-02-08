import React, { createContext, memo, useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../http/authentication/AuthContext';
import LeftSidebar from './LeftSidebar';
import './Statics.scss';
import Viewport from './Viewport';

export const StaticContext = createContext();

export const useCollapseSidebar = () => {
    const { sidebar: { toggle } } = useContext(StaticContext);
    useEffect(() => {
        toggle(false);
        return () => toggle(true);
    }, []);
}

export default withRouter(memo(function Statics({
    match: {
        path,
    },
    initialRoute,
    routes,
    allowedApplications,
}) {

    const {
        currentUser: {
            username,
        } = {},
        logout,
    } = useContext(AuthContext);

    const viewportRef = useRef();

    const [open, setOpen] = useState(true);

    const toggle = open => setOpen(typeof open === 'boolean' ? open : open => !open);

    return (
        <StaticContext.Provider
            value={{
                sidebar: {
                    open,
                    toggle,
                },
                routes,
                viewportRef,
            }}
        >
            <LeftSidebar
                routeProps={arguments[0]}
                {...{
                    open,
                    path,
                    toggle,
                    routes,
                    toggle,
                    allowedApplications,
                    username,
                    logout,
                }}
            />
            <Viewport
                {...{
                    viewportRef,
                    initialRoute,
                    routes,
                }}
            />
        </StaticContext.Provider>
    );
}));
