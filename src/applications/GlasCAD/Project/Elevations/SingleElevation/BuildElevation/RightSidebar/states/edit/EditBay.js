import React from 'react';

import { SelectionContext } from '../../../SelectionContext';

import { TitleBar } from '../../../../../../../../../components';

import EditInfill from './EditInfill';

import AddBay from '../add/AddBay';
import AddColumn from '../add/AddColumn';
import AddHorizontal from '../add/AddHorizontal';
import AddVertical from '../add/AddVertical';
import AddDoor from '../add/AddDoor';

import RaiseCurb from '../rough-opening/RaiseCurb';
import StepHead from '../rough-opening/StepHead';
import RakeTop from '../rough-opening/RakeTop';
import ArchTop from '../rough-opening/ArchTop';
import GabledTop from '../rough-opening/GabledTop';
import CurvedWall from '../rough-opening/CurvedWall';

const editButtons = [
    EditInfill,
];

const circleButtons = [
    AddBay,
    AddColumn,
    AddHorizontal,
    AddVertical,
    AddDoor,
];

const roughOpeningButtons = [
    RaiseCurb,
    StepHead,
    RakeTop,
    ArchTop,
    GabledTop,
    CurvedWall,
];

const allButtons = [
    editButtons,
    circleButtons,
    roughOpeningButtons,
];

export default {
    name: "Edit Bay",
    component: EditBay,
};

function EditBay() {
    return (
        <SelectionContext.Consumer>
            {({
                sidebar: {
                    setState,
                },
            }) => (
                    <>
                        <TitleBar
                            title="Bay Options"
                        />
                        {allButtons.map(buttons => (
                            <div className="sidebar-group">
                                {buttons.map(component => (
                                    <button
                                        className="sidebar-button empty"
                                        onClick={() => setState(component)}
                                    >
                                        <span className="icon"></span>
                                        <span>{component.name}</span>
                                    </button>
                                ))}
                            </div>
                        ))}
                    </>
                )}
        </SelectionContext.Consumer>
    );
}
