import React from 'react';
import OptionChildren from "./OptionChildren";
import ValueAndTypeChildren from "./ValueAndTypeChildren";

export default function ({ item: { __typename } }) {
    const props = arguments[0];
    const ChildrenComponent = __typename.match(/option$/i) ?
        OptionChildren
        :
        ValueAndTypeChildren;

    return (<ChildrenComponent {...props} />);
};