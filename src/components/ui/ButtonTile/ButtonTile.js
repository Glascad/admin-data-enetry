import React from 'react';
// import PropTypes from 'prop-types';
import './ButtonTile.scss';

// ButtonTile.propTypes = {
//     buttonProps: PropTypes.arrayOf(PropTypes.object).isRequired
// };

ButtonTile.defaultProps = {
    buttonProps: [],
};

export default function ButtonTile({
    buttonProps,
}) {
    return (
        <div className="ButtonTile" >
            {buttonProps
                .filter(Boolean)
                .map(({ className, ...button }, i) => (
                    <button
                        key={i}
                        className={`button ${
                            className
                            ||
                            "empty light"
                            }`}
                        {...button}
                    >
                        {button.text || button.children}
                    </button>
                ))}
        </div>
    );
}
