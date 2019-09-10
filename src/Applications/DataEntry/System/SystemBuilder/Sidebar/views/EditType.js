import React from 'react';
import { TitleBar } from '../../../../../../components';

function EditType({
    selectedItem: selectedType,
    selectedItem: {
        __typename,
    } = {},
}) {
    const isDetail = !!__typename.match(/Detail/i);
    return (
        <>
            <TitleBar
                title={`Edit ${__typename.replace(/^System(.*)Type$/, '$1')}`}
            />
        </>
    );
}

export const SystemDetailType = {
    title: "Edit Detail",
    component: EditType,
};

export const SystemConfigurationType = SystemDetailType;
