import React, { useEffect, useContext, useRef } from 'react';
import { RightSidebar, TitleBar, CollapsibleTitle } from '../../../../../../components';
import { StaticContext } from '../../../../../Statics/Statics';

export default function DetailBuilderSidebar({
    children,
    selectedItem,
    selectItem,
}) {
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
            View={{
                title: "Parts",
                component: () => (
                    <>
                        <CollapsibleTitle
                            title="Parts"
                        >
                            <div className="sidebar-list">
                                {children.map(item => {
                                    const { _part: { partNumber } = {} } = item;
                                    const selected = item === selectedItem;
                                    return (
                                        <button
                                            className={`sidebar-list-item ${selected ? 'selected' : ''}`}
                                            onClick={() => selectItem(item)}
                                        >
                                            {partNumber}
                                        </button>
                                    );
                                })}
                            </div>
                        </CollapsibleTitle>
                    </>
                ),
            }}
        />
    );
}
