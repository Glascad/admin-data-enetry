import React from 'react';
import { match } from "../../../../../../../utils";
import OptionToggles from './OptionToggles';
import ValueToggles from './ValueToggles';
import TypeToggles from './TypeToggles';

export default function ItemToggles({ selectedItem: { __typename = '' } }) {
    const props = arguments[0];
    const ItemToggles = match(__typename)
        .regex(/Option$/, () => OptionToggles)
        .regex(/Value$/, () => ValueToggles)
        .otherwise(() => TypeToggles);
    return <ItemToggles {...props} />;
};