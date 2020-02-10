import React from 'react';
import { DoubleArrow, TitleBar } from '../../../../../../../../../components';

export default {
    title: "Edit Infill",
    component: EditInfill,
};

function EditInfill() {
    return (
        <>
            <TitleBar
                title="Edit Infill"
            />
            {/* <BackButton /> */}
            <DoubleArrow />
        </>
    );
}
