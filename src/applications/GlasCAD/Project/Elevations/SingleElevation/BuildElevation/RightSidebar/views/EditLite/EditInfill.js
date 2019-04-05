import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import BackButton from '../components/BackButton';

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
            <BackButton />
        </>
    );
}
