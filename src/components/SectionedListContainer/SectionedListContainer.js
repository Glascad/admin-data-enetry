import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from '../ListContainer/ListContainer';

SectionedListContainer.propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    addItem: PropTypes.func,
    filter: PropTypes.func,
    sort: PropTypes.func,
};

export default function SectionedListContainer() {
    return (

    );
}
