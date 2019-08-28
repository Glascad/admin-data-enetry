import React, { PureComponent } from 'react';
import './RightSidebar.scss';
import DoubleArrow from '../DoubleArrow/DoubleArrow';

export default class RightSidebar extends PureComponent {

    render = () => {
        const {
            props: {
                stackedView,
                stackedView: {
                    title: stackedTitle = '',
                    component: StackedChild = () => null,
                } = {},
                View: {
                    title: initialTitle,
                    component: InitialPureComponent,
                },
                open,
                handleCloseClick,
                childProps,
            },
        } = this;

        const title = stackedView ?
            stackedTitle
            :
            initialTitle;

        const Child = stackedView ?
            StackedChild
            :
            InitialPureComponent;

        return (
            <div
                className={`RightSidebar ${open}`}
                onKeyDown={e => e.stopPropagation()}
                onMouseDown={e => e.stopPropagation()}
                onWheel={e => e.stopPropagation()}
            >
                <button
                    className="sidebar-button primary"
                    onClick={handleCloseClick}
                >
                    {stackedView ? (
                        <DoubleArrow
                            className="icon"
                            tagname="div"
                        />
                    ) : null}
                    <span>
                        Close {title}
                    </span>
                </button>
                <Child
                    {...{ ...childProps }}
                />
            </div>
        );
    }
}