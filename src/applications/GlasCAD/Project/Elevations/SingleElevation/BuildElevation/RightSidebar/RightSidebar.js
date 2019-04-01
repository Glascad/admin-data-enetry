import React, { Component } from 'react';

import { SelectionContext } from '../contexts/SelectionContext';

import RecursiveElevation from '../../utils/recursive-elevation/elevation';

import VIEWS from './views';

import './RightSidebar.scss';
import {
    DoubleArrow,
    withContext,
} from '../../../../../../../components';

class RightSidebar extends Component {

    state = {
        stackedView: undefined,
    };

    toggleStackedView = stackedView => this.setState({ stackedView });

    componentDidUpdate = ({
        context: {
            selection: {
                items: {
                    0: {
                        class: prevClass,
                    } = {},
                },
            },
        },
    }) => {
        const {
            state: {
                stackedView,
            },
            props: {
                context: {
                    selection: {
                        items: {
                            0: {
                                class: newClass,
                            } = {},
                            length: newLength,
                        },
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
                    name: stackedName = '',
                    component: StackedChild = () => null,
                } = {},
            },
            props: {
                elevation,
                updateElevation,
                context: {
                    selection: {
                        items: {
                            length,
                        },
                        cancelSelection,
                    },
                },
                View: {
                    name: initialName,
                    component: InitialComponent,
                }
            },
            toggleStackedView,
        } = this;

        const handleClick = stackedView ?
            () => toggleStackedView()
            :
            cancelSelection;

        const name = stackedView ?
            stackedName
            :
            initialName;

        const Child = stackedView ?
            StackedChild
            :
            InitialComponent;

        return (
            <div id="RightSidebar" className={length ? "" : "closed"}>
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
                        Close {name}
                    </span>
                </button>
                <Child
                    {...{
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
} = RecursiveElevation;

const mapProps = ({
    context: {
        selection: {
            items: [
                {
                    vertical,
                    class: SelectedClass,
                } = {},
            ],
        },
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
            VIEWS.Settings
});

export default withContext(SelectionContext, mapProps)(RightSidebar);
