import React from 'react';
import { match } from "../../../../../../../utils";
import SystemName from '../../../../modules/SystemName';
import DetailOrConfigurationType from './DetailOrConfigurationType';
import OptionName from './OptionName';
import PartNumber from './PartNumber';
import ValueName from './ValueName';

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