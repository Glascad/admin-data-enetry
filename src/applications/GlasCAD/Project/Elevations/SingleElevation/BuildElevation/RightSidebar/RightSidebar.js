import React, { Component } from 'react';

import { SelectionContext } from '../contexts/SelectionContext';

import RecursiveElevation from '../../utils/recursive-elevation/elevation';

import VIEWS from './views';

import './RightSidebar.scss';
import { DoubleArrow } from '../../../../../../../components';

const {
    RecursiveContainer,
    RecursiveFrame,
} = RecursiveElevation;

const getSidebarViewFromSelection = ({
    items: [
        {
            vertical,
            class: SelectedClass,
        } = {}
    ],
}) => (
        SelectedClass === RecursiveContainer ?
            VIEWS.EditLite
            :
            SelectedClass === RecursiveFrame ?
                vertical ?
                    VIEWS.EditVertical
                    :
                    VIEWS.EditHorizontal
                :
                VIEWS.Settings
    );

export default class RightSidebar extends Component {

    state = {
        stackedView: undefined,
    };

    toggleView = view => this.setState({
        stackedView: view,
    });

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
            },
            toggleView,
        } = this;

        return (
            <SelectionContext.Consumer>
                {({
                    selection,
                    selection: {
                        items: {
                            length,
                        },
                        cancelSelection,
                    },
                }) => {

                    const {
                        name,
                        component: Child,
                    } = getSidebarViewFromSelection(selection);

                    const nameToRender = stackedView ?
                        stackedName
                        :
                        name;

                    const handleClick = stackedView ?
                        () => toggleView()
                        :
                        cancelSelection;

                    const ChildToRender = stackedView ?
                        StackedChild
                        :
                        Child;

                    return (
                        <div id="RightSidebar" className={length ? "" : "closed"}>
                            <button
                                className="sidebar-button primary"
                                onClick={handleClick}
                            >
                                {stackedView ? (
                                    <DoubleArrow />
                                ) : null}
                                <span>
                                    Close {nameToRender}
                                </span>
                            </button>
                            <ChildToRender
                                {...{
                                    elevation,
                                    updateElevation,
                                    toggleView,
                                }}
                            />
                        </div>
                    );
                }}
            </SelectionContext.Consumer>
        );
    }
}
