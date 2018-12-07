import React, { Component } from 'react';
import {
    HeadedListContainer
} from '../../../components';

export default class SystemOptions extends Component {
    render = () => {
        return (
            <div>
                <HeadedListContainer
                    title="System Options"
                    list={{
                        items: [],
                        renderItem: () => null
                    }}
                />
            </div>
        );
    }
}
