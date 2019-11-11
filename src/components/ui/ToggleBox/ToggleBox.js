import React from 'react';
import PropTypes from 'prop-types';
import Toggle from '../Toggle/Toggle';
import GroupingBox from '../GroupingBox/GroupingBox';

import './ToggleBox.scss';

ToggleBox.propTypes = {
    views: PropTypes.arrayOf(PropTypes.shape({
        toggle: PropTypes.shape({
            text: PropTypes.string,
            selected: PropTypes.bool,
            className: PropTypes.string,
        }),
        render: PropTypes.func,
    })),
};

export default function ToggleBox({
    views = [],
    ...groupingBoxProps
}) {
    const { buttons, children } = views.reduce(({
        buttons = [],
        children,
    }, {
        render,
        toggle,
    }) => ({
        buttons: buttons.concat(toggle),
        children: children || (toggle.selected && render) || null,
    }), {});
    return (
        <GroupingBox
            {...groupingBoxProps}
            title={(
                <Toggle
                    buttons={buttons}
                />
            )}
        >
            {typeof children === 'function' ?
                children(arguments[0])
                :
                children
            }
        </GroupingBox>
    );
}
