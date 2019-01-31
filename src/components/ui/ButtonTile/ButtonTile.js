import React from 'react';
// import PropTypes from 'prop-types';
import './ButtonTile.scss';

// ButtonTile.propTypes = {
//     buttonProps: PropTypes.arrayOf(PropTypes.object).isRequired
// };

export default function ButtonTile({
    buttonProps = []
}) {
    return (
        <div className="ButtonTile" >
            {buttonProps
                .filter(Boolean)
                .map(({ className, ...button }, i) => (
                    <button
                        className={`button ${
                            className
                            ||
                            "empty light"
                            }`}
                        {...button}
                        key={i}
                    >
                        {button.text || button.children}
                    </button>
                ))}
        </div>
    );
}
