import React, { PureComponent } from 'react';
import './RightSidebar.scss';
import {
    DoubleArrow,
    withContext,
} from '../../../components';

export default class ElevationRightSidebar extends PureComponent {

    render = () => {
        const {
            props: {
                toggleStackedView,
                stackedView,
                currentIndex,
                states,
                title,
                Child,
                length,
                handleClick,
            },
        } = this;

        return (    
            <div
                id="RightSidebar"
                className={length ? 'open' : 'closed'}
                onKeyDown={e => e.stopPropagation()}
                onMouseDown={e => e.stopPropagation()}
                onWheel={e => e.stopPropagation()}
            >
                <button
                    className="sidebar-button primary"
                    onClick={handleClick}
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
                    {...{
                        states,
                        currentIndex,
                        toggleStackedView,
                    }}
                />
            </div>
        );
    }
}