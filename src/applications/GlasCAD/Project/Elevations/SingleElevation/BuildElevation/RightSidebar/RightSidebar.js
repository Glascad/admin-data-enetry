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

    previousSelection = {};

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
            previousSelection,
            toggleView,
        } = this;

        return (
            <SelectionContext.Consumer>
                {({
                    selection,
                    selection: {
                        items,
                        items: {
                            length,
                        },
                        cancelSelection,
                    },
                }) => {

                    const {
                        [length - 1]: lastItem,
                    } = items;

                    this.previousSelection = lastItem;

                    const {
                        name,
                        component: Child,
                    } = getSidebarViewFromSelection(selection);

                    const shouldRenderStackedView = stackedView && ((
                        previousSelection === lastItem
                    ) || (
                            previousSelection
                            &&
                            lastItem
                            &&
                            previousSelection.refId === lastItem.refId
                        ));

                    const nameToRender = shouldRenderStackedView ?
                        stackedName
                        :
                        name;

                    const handleClick = shouldRenderStackedView ?
                        () => toggleView()
                        :
                        cancelSelection;

                    const ChildToRender = shouldRenderStackedView ?
                        StackedChild
                        :
                        Child;

                    return (
                        <div id="RightSidebar" className={length ? "" : "closed"}>
                            <button
                                className="sidebar-button primary"
                                onClick={handleClick}
                            >
                                {shouldRenderStackedView ? (
                                    <DoubleArrow
                                        className="icon"
                                        tagname="div"
                                    />
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
