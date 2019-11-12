import React, { useState } from 'react';
import Statics from '../Statics/Statics';
import { TitleBar, Pill, ListWrapper, Tree, useQuery, RightSidebar, Input, GroupingBox, Toggle, ToggleBox } from '../../components';
import { match } from '../../utils';
import './Practice.scss';

function Practice({ selectedItem: { __typename = '' } }) {
    const props = arguments[0];
    const NameComponent = match(__typename)
        .regex(/Value$/, ValueName)
        .regex(/Option$/, OptionName)
        .equals('System', SystemName)
        .equals('ConfigurationPart', PartNumber)
        .otherwise(DetailOrConfigurationType);
    return <NameComponent {...props} />;
}

function OtherPractice({ selectedItem: { __typename } }) {
    const props = arguments[0];
    return (
        __typename.match(/Option$/) ?
            <OptionValueChildren {...props} />
            :
            <OptionOrOtherChildren {...props} />
    );

}

function OptionValueChildren() {
    const values = getChildren();
    const validValues = getPossibleChildren();
    
    return (
        <GroupingBox
        >

        </GroupingBox>
    );
}

function OptionOrOtherChildren() {
    const otherChildName = match(__typename)
    // ... get child name based on typename (Details, Configurations, or Parts)
    const children = getChildren();
    const possibleChildren = getPossibleChildren();
    return (
        <ToggleBox
            views={[
                
            ]}
        />
    )
}


export default () => <Statics routes={{ Practice }} />
