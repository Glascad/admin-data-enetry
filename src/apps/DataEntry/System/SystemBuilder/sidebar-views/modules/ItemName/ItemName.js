import React from 'react';
import { match } from "../../../../../../../utils";
import ValueName from './ValueName';
import OptionName from './OptionName';
import SystemName from './SystemName';
import PartNumber from './PartNumber';
import DetailOrConfigurationType from './DetailOrConfigurationType';

export default function ItemName({ selectedItem: { __typename = '' } }) {
    const props = arguments[0];
    const NameComponent = match(__typename)
        .regex(/Value$/, () => ValueName)
        .regex(/Option$/, () => OptionName)
        .equals('System', () => SystemName)
        .equals('ConfigurationPart', () => PartNumber)
        .otherwise(() => DetailOrConfigurationType);
    return <NameComponent {...props} />;
};