import React from 'react';

import { SelectionContext } from '../../SelectionContext';

import { TitleBar } from '../../../../../../../components';

import EditInfill from './EditInfill';

import AddBay from './AddBay';
import AddColumn from './AddColumn';
import AddIntermediates from './AddIntermediates';
import AddDoor from './AddDoor';

import RaiseCurb from './RaiseCurb';
import StepHead from './StepHead';
import RakeTop from './RakeTop';
import ArchTop from './ArchTop';
import GabledTop from './GabledTop';
import CurvedWall from './CurvedWall';

const editButtons = [
    EditInfill,
];

const addButtons = [
    AddBay,
    AddColumn,
    AddIntermediates,
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
    addButtons,
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
                                        className="sidebar-button"
                                        onClick={() => setState(component)}
                                    >
                                        {component.name}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </>
                )}
        </SelectionContext.Consumer>
    );
}
