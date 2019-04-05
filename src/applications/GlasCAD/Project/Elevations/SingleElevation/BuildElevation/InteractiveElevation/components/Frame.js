import React, { PureComponent } from 'react';

// import { SelectionContext } from '../../contexts/SelectionContext';

// import { withContext } from '../../../../../../../../components';

export default class Frame extends PureComponent {

    handleClick = () => this.props.selectItem(this.props._frame);

    render = () => {
        const {
            props: {
                // selectable,
                _frame: {
                    refId,
                    vertical,
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    } = {},
                },
                selectable,
            },
            handleClick,
        } = this;

        return (
            <div
                // to make selecting a frame less difficult
                id={refId}
                className={`frame-wrapper ${
                    vertical ?
                        'vertical'
                        :
                        'horizontal'
                    }`}
                style={selectable ?
                    {
                        left: x - 10,
                        bottom: y - 10,
                        height: height + 20,
                        width: width + 20,
                    } : {
                        left: x,
                        bottom: y,
                        height,
                        width,
                    }}
                onClick={handleClick}
            >
                <div
                    className="Frame"
                    style={{
                        height,
                        width,
                    }}
                />
            </div>
        );
    }
}

// const mapProps = ({
//     context: {
//         selectItem,
//         items: {
//             0: {
//                 class: SelectedClass,
//                 vertical: selectedVertical,
//             } = {},
//             length,
//         },
//     },
//     _frame: {
//         vertical,
//         class: RecursiveFrame,
//     },
// }) => ({
//     context: undefined,
//     selectItem,
//     selectable: length === 0 || (
//         SelectedClass === RecursiveFrame
//         &&
//         selectedVertical === vertical
//     ),
// });

// export default withContext(SelectionContext, mapProps, { pure: true })(Frame);
