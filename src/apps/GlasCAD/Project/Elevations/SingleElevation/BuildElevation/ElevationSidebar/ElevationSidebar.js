import React, { PureComponent } from 'react';
import { RightSidebar, withContext } from '../../../../../../../components';
import RecursiveElevation from '../../utils/recursive-elevation/elevation';
import { SelectionContext } from '../contexts/SelectionContext';
import VIEWS from './views';

class ElevationSidebar extends PureComponent {

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
            },
            props: {
                currentIndex,
                states,
                elevation,
                updateElevation,
                systemMap,
                systemSet,
                context: {
                    items: {
                        length,
                    },
                    cancelSelection,
                },
                View,
            },
            toggleStackedView,
        } = this;

        const handleCloseClick = stackedView ?
            () => toggleStackedView()
            :
            cancelSelection;

        return (
            <RightSidebar
                stackedView={stackedView}
                View={View}
                open={!!length}
                handleCloseClick={handleCloseClick}
                childProps={{
                    toggleStackedView,
                    currentIndex,
                    states,
                    updateElevation,
                    elevation,
                    systemMap,
                    systemSet,
                }}
            />
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

export default withContext(SelectionContext, mapProps)(ElevationSidebar);
