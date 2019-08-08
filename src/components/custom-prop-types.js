import React from 'react';
import PropTypes from 'prop-types';

export default {
    renderable: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.element,
        ])),
    ]),
    deprecated: (propType, explanation) => (props, propName, componentName, ...rest) => props[propName] ?
        console.error(`"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`)
        :
        propType(props, propName, componentName, ...rest),
}
