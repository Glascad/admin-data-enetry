import React from 'react';
import PropTypes from 'prop-types';

import Ellipsis from '../Ellipsis/Ellipsis';
import customPropTypes from '../../custom-prop-types';

AsyncButton.propTypes = {
    className: PropTypes.string,
    loadingText: Ellipsis.propTypes.text,
    loading: PropTypes.bool,
    text: PropTypes.string,
    children: customPropTypes.renderable,
};

export default function AsyncButton({
    className = '',
    loadingText = '',
    loading = false,
    text = '',
    children = '',
    ...props
}) {
    return (
        <button
            className={className}
            {...props}
        >
            {loading ? (
                <Ellipsis
                    text={loadingText}
                />
            ) :
                children
                ||
                text
            }
        </button>
    )
}
