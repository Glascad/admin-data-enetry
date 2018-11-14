import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeadedListContainer extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        filters: PropTypes.arrayOf(PropTypes.exact({
            name: PropTypes.string.isRequired,
            callback: PropTypes.function.isRequired,
        })),
    }

    render = () => {
        return (
            <div className="HeadedListContainer">

            </div>
        );
    }
}
