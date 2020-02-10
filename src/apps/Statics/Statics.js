import React, { createContext, memo, useContext, useEffect, useRef, useState } from 'react';
import { Navigator } from '../../components';
import LeftSidebar from './LeftSidebar';
import './Statics.scss';

export const StaticContext = createContext();

export const useCollapseSidebar = () => {
    const { sidebar: { toggle } } = useContext(StaticContext);
    useEffect(() => {
        toggle(false);
        return () => toggle(true);
    }, []);
}

export default memo(function Statics({
    initialRoute,
    routes,
    allowedApplications,
    currentUser,
    logout,
}) {

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
                    toggle,
                    routes,
                    allowedApplications,
                    currentUser,
                    logout,
                }}
            />
            <div
                id="viewport"
                ref={viewportRef}
            >
                <Navigator
                    initialRoute={initialRoute}
                    routes={routes}
                />
            </div>
        </StaticContext.Provider>
    );
});
