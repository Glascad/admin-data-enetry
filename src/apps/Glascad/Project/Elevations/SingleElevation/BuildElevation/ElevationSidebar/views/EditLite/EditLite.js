import React from 'react';
import * as Icons from '../../../../../../../../../assets/icons';
import { TitleBar } from '../../../../../../../../../components';
import SidebarLink from '../../../../../../../../../components/ui/RightSidebar/SidebarLink';
import { DIRECTIONS } from '../../../../../../../../../utils';
import { withActionContext } from '../../../contexts/ActionContext';
import { withSelectionContext } from '../../../contexts/SelectionContext';
import AddBay from "../shared/AddBay";
import { RaiseCurb, StepHead } from '../shared/AlterRoughOpening';

function EditLite({
    selection: {
        items: allContainers,
        items: {
            0: firstContainer,
            length,
        },
    },
    ACTIONS: {
        deleteContainers,
        mergeContainers,
        addIntermediates,
    },
    elevation,
    updateElevation,
    toggleStackedView,
}) {

    const mergeableDirections = [
        [DIRECTIONS.UP, "Up", Icons.MergeUp],
        [DIRECTIONS.DOWN, "Down", Icons.MergeDown],
        [DIRECTIONS.LEFT, "Left", Icons.MergeLeft],
        [DIRECTIONS.RIGHT, "Right", Icons.MergeRight],
    ]
        .filter(([direction]) => firstContainer.canMergeByDirection(...direction));

    return (
        <>
            <TitleBar
                title="Edit Lite"
            />
            {/* <div className="sidebar-group">
                    <SidebarLink
                        toggleStackedView={toggleStackedView}
                        View={{ title: "Edit Infill", component: () => null }}
                        Icon={Icons.EditLite}
                    />
                </div> */}
            {length === 1 ?
                mergeableDirections.length ? (
                    <div className="sidebar-group">
                        {mergeableDirections.map(([direction, key, Icon]) => (
                            <button
                                key={key}
                                className="sidebar-button empty"
                                data-cy={`merge-${key.toLowerCase()}`}
                                onClick={() => mergeContainers({
                                    container: firstContainer,
                                    direction,
                                })}
                            >
                                <Icon />
                                <span>
                                    Merge {key}
                                </span>
                            </button>
                        ))}
                    </div>
                ) : null : (
                    <>
                        {/* <button
                            // key={vertical}
                            className="sidebar-button empty"
                            onClick={() => null}
                            >
                            Merge
                            {
                                // vertical ? 'vertically' : 'horizontally'
                            }
                        </button> */}
                    </>
                )}
            <div className="sidebar-group">
                {allContainers.every(({ canAddVertical }) => canAddVertical) ? (
                    <button
                        className="sidebar-button empty"
                        data-cy="add-vertical"
                        onClick={() => addIntermediates({ vertical: true })}
                    >
                        <Icons.AddVertical />
                        <span>
                            Add Vertical{length > 1 ? 's' : ''}
                        </span>
                    </button>
                    // <SidebarLink
                    //     toggleStackedView={toggleStackedView}
                    //     View={AddVertical}
                    //     Icon={Icons.AddVertical}
                    // />
                ) : null}
                {allContainers.every(({ canAddHorizontal }) => canAddHorizontal) ? (
                    <button
                        className="sidebar-button empty"
                        data-cy="add-horizontal"
                        onClick={() => addIntermediates({ vertical: false })}
                    >
                        <Icons.AddHorizontal />
                        <span>
                            Add Horizontal{length > 1 ? 's' : ''}
                        </span>
                    </button>
                    // <SidebarLink
                    //     toggleStackedView={toggleStackedView}
                    //     View={AddHorizontal}
                    //     Icon={Icons.AddHorizontal}
                    // />
                ) : null}
            </div>
            {allContainers.every(({ canAddBay }) => canAddBay)
                &&
                allContainers.every(({ leftFrame, rightFrame }, i, [firstItem]) => (
                    leftFrame === firstItem.leftFrame
                    ||
                    rightFrame === firstItem.rightFrame
                ))
                ? (
                    <div className="sidebar-group">
                        <SidebarLink
                            toggleStackedView={toggleStackedView}
                            View={AddBay}
                            Icon={Icons.AddLite}
                        />
                    </div>
                ) : null}
            {allContainers.every(({ canStepHead }) => canStepHead) ? (
                <div className="sidebar-group">
                    <SidebarLink
                        toggleStackedView={toggleStackedView}
                        View={StepHead}
                        Icon={Icons.StepHead}
                    />
                </div>
            ) : null}
            {allContainers.every(({ canRaiseCurb }) => canRaiseCurb) ? (
                <div className="sidebar-group">
                    <SidebarLink
                        toggleStackedView={toggleStackedView}
                        View={RaiseCurb}
                        Icon={Icons.StepHead}
                    />
                </div>
            ) : null}
            {allContainers.every(({ canDelete }) => canDelete) ? (
                <button
                    data-cy="sidebar-delete-button"
                    className="sidebar-button danger"
                    onClick={deleteContainers}
                >
                    Delete Lite{length > 1 ? 's' : ''}
                </button>
            ) : null}
        </>
    );
}

export default {
    title: "Edit Lite",
    component: withSelectionContext(withActionContext(EditLite)),
};
