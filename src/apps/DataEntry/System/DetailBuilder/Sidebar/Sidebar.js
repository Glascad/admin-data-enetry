import React, { useContext, useEffect, useRef, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath, getDetailTypeFromPath } from '../../../../../app-logic/system';
import { RightSidebar } from '../../../../../components';
import { parseSearch } from '../../../../../utils';
import { StaticContext } from '../../../../Statics/Statics';
import ChildList from './modules/ChildList';
import ConfigurationOptions from './modules/ConfigurationOptions';

export default withRouter(memo(function DetailBuilderSidebar({
    children,
    selectedItem,
    selectItem,
    location: {
        search,
    },
    systemMap,
    selectConfigurationPath,
    selectedConfigurationPaths,
}) {
    const { path } = parseSearch(search);
    const detailType = getDetailTypeFromPath(path);
    const configurationType = getConfigurationTypeFromPath(path);

    const { Viewport, sidebar: { open } } = useContext(StaticContext);

    const ref = useRef();

    useEffect(() => {
        var previousWidth;
        var previousBoxShadow;

        setTimeout(() => {
            try {
                previousWidth = Viewport.current.style.width;
                previousBoxShadow = ref.current.style.boxShadow;
            } catch (err) {
                console.error(err);
            }
        });

        const resizeViewport = () => setTimeout(() => {
            try {
                Viewport.current.style.width = `${
                    ref.current.offsetLeft
                    -
                    Viewport.current.offsetLeft
                    }px`;
                ref.current.style.boxShadow = 'none';
            } catch (err) {
                console.error(err);
            }
        });

        resizeViewport();

        window.addEventListener('resize', resizeViewport);

        return () => setTimeout(() => {
            try {
                Viewport.current.style.width = previousWidth;
                ref.current.style.boxShadow = previousBoxShadow;
            } catch (err) {
                console.error(err);
            }
            window.removeEventListener('resize', resizeViewport);
        });
    }, [Viewport, open]);

    return (
        <RightSidebar
            sidebarRef={ref}
            open={true}
        >
            <ChildList
                children={children}
                configurationType={configurationType}
                selectItem={selectItem}
                selectedItem={selectedItem}
            />
            <ConfigurationOptions
                systemMap={systemMap}
                selectedItem={selectedItem}
                selectedConfigurationPaths={selectedConfigurationPaths}
                selectConfigurationPath={selectConfigurationPath}
            />
        </RightSidebar>
    );
}));
