import React, { PureComponent } from 'react';

import RecursiveContainer from '../../../utils/recursive-elevation/container';
import RecursiveFrame from '../../../utils/recursive-elevation/frame';
import RecursiveDetail from '../../../utils/recursive-elevation/detail';
import { transformProps } from '../../../../../../../../components';
import { pixelsPerInch } from '../../contexts/ElevationTransformContext';

class SelectedItem extends PureComponent {

    handleClick = () => this.props.selectItem(this.props.item);

    render = () => {
        const {
            props: {
                item: {
                    refId,
                    class: SelectedClass,
                },
                scaledPlacement: {
                    x,
                    y,
                    height,
                    width,
                },
                lastSelected,
            },
            handleClick,
        } = this;

        return (
            <div
                className={`SelectedItem selected-${
                    SelectedClass === RecursiveContainer ?
                        'container'
                        :
                        SelectedClass === RecursiveFrame ?
                            'frame'
                            :
                            SelectedClass === RecursiveDetail ?
                                'detail'
                                :
                                ''
                    } ${
                    lastSelected ?
                        'last-selected'
                        :
                        ''
                    }`}
                style={{
                    left: x,
                    bottom: y,
                    height,
                    width,
                }}
                onClick={handleClick}
            />
        );
    }
}

export default transformProps(({
    item: {
        placement: {
            x,
            y,
            height,
            width,
        },
    },
}) => ({
    scaledPlacement: {
        x: pixelsPerInch * x,
        y: pixelsPerInch * y,
        height: pixelsPerInch * height,
        width: pixelsPerInch * width,
    },
}))(SelectedItem);
