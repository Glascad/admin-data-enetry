import React, { PureComponent } from 'react';

import { withContext } from '../../../../../../../../components';

import { SelectionContext } from '../../contexts/SelectionContext';

class Selection extends PureComponent {
    render = () => {
        const {
            props: {
                context,
                context: {
                    items,
                    items: {
                        0: {
                            class: SelectedClass,
                        },
                        length,
                    },
                },
            },
        } = this;

        return (
            <div>
                
            </div>
        );
    }
}

export default withContext(SelectionContext)(Selection);
