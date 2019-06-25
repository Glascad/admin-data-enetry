import React, { PureComponent } from 'react';

import { SelectionContext } from '../contexts/SelectionContext';

import RecursiveElevation from '../../utils/recursive-elevation/elevation';

import VIEWS from './views';

import './RightSidebar.scss';
import {
    DoubleArrow,
    withContext,
} from '../../../../../../../components';

class RightSidebar extends PureComponent {

    state = {
        stackedView: undefined,
    };

    toggleStackedView = stackedView => this.setState({ stackedView });

    componentDidUpdate = ({
        context: {
            items: {
                0: {
                    class: prevClass,
                } = {},
            },
        },
    }) => {
        const {
            state: {
                stackedView,
            },
            props: {
                context: {
                    items: {
                        0: {
                            class: newClass,
                        } = {},
                        length: newLength,
                    },
                },
            },
        } = this;
        if (
            stackedView && (
                !newLength || (
                    prevClass !== newClass
                )
            )
        ) {
            this.toggleStackedView();
        }
    }

    render = () => {
        const {
            state: {
                stackedView,
                stackedView: {
                    title: stackedTitle = '',
                    component: StackedChild = () => null,
                } = {},
            },
            props: {
                currentIndex,
                states,
                elevation,
                updateElevation,
                context: {
                    items: {
                        length,
                    },
                    cancelSelection,
                },
                View: {
                    title: initialTitle,
                    component: InitialPureComponent,
                },
            },
            toggleStackedView,
        } = this;

        const handleClick = stackedView ?
            () => toggleStackedView()
            :
            cancelSelection;

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
                        elevation,
                        updateElevation,
                        toggleStackedView,
                    }}
                />
            </div>
        );
    }
}

const {
    RecursiveContainer,
    RecursiveFrame,
    RecursiveDetail,
} = RecursiveElevation;

const mapProps = ({
    context: {
        items: [
            {
                vertical,
                class: SelectedClass,
            } = {},
        ],
    },
}) => ({
    View: SelectedClass === RecursiveContainer ?
        VIEWS.EditLite
        :
        SelectedClass === RecursiveFrame ?
            vertical ?
                VIEWS.EditVertical
                :
                VIEWS.EditHorizontal
            :
            SelectedClass === RecursiveDetail ?
                VIEWS.EditDetail
                :
                VIEWS.Settings,
});

export default withContext(SelectionContext, mapProps)(RightSidebar);
