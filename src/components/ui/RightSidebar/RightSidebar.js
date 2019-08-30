import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DoubleArrow from '../DoubleArrow/DoubleArrow';
import customPropTypes from '../../custom-prop-types';

import './RightSidebar.scss';

RightSidebar.propTypes = {
    stackedView: PropTypes.shape({
        title: PropTypes.string.isRequired,
        component: customPropTypes.renderable.isRequired,
    }).isRequired,
    View: PropTypes.shape({
        title: PropTypes.string.isRequired,
        component: customPropTypes.renderable.isRequired,
    }),
    open: PropTypes.bool.isRequired,
    handleCloseClick: PropTypes.func,
    childProps: PropTypes.object,
};

export default function RightSidebar({
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
}) {

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
        className={`RightSidebar ${open ? "open" : "closed"}`}
        onKeyDown={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
        onWheel={e => e.stopPropagation()}
        >
            <button
                data-cy="right-sidebar-close-button"
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
                {...childProps}
            />
        </div>
    );
}
