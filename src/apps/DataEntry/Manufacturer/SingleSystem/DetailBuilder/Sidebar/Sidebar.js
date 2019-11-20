import React, { useEffect, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { RightSidebar, TitleBar, CollapsibleTitle } from '../../../../../../components';
import { StaticContext } from '../../../../../Statics/Statics';
import { parseSearch, normalCase } from '../../../../../../utils';
import { getConfigurationTypeFromPath, getDetailTypeFromPath, getLastItemFromPath } from '../../../../../../app-logic/system-utils';

export default withRouter(function DetailBuilderSidebar({
    children,
    selectedItem,
    selectItem,
    location: {
        search,
    },
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
                console.log(Viewport.current.style.width);
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
            <CollapsibleTitle
                title={configurationType ? "Parts" : "Configurations"}
            >
                <div className="sidebar-list">
                    {children.map(item => {
                        const { path } = item;
                        const selected = item === selectedItem;
                        const name = getLastItemFromPath(path);
                        const normalName = configurationType ?
                            name
                            :
                            normalCase(name);
                        console.log({
                            item,
                            selected,
                            name,
                            normalName,
                        });
                        return (
                            <button
                                className={`sidebar-list-item ${selected ? 'selected' : ''}`}
                                onClick={() => selectItem(item)}
                            >
                                {normalName}
                            </button>
                        );
                    })}
                </div>
            </CollapsibleTitle>
        </RightSidebar>
    );
});
