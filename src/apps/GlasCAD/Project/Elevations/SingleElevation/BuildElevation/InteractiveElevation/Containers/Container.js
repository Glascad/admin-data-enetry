import React, { memo } from 'react';
import _ from 'lodash';
import { transformProps } from '../../../../../../../../components';
import { pixelsPerInch } from '../../contexts/ElevationTransformProvider';
import { withSelectionContext } from '../../contexts/SelectionContext';
import ContainerId from './ContainerId';

const Container = memo(function Container({
    container,
    container: {
        id,
        refId,
        customRoughOpening,
        registerReactComponent,
    },
    scaledPlacement: {
        x,
        y,
        height,
        width,
    },
    tabIndex,
    selected,
    selectItem,
    lastSelected,
}) {

    registerReactComponent(this);

    return (
        <div
            id={refId}
            data-cy={`container-${id}`}
            className={`Container ${
                customRoughOpening ? 'custom-rough-opening' : ''
                } ${
                selected ? 'selected' : ''
                } ${
                lastSelected ? 'last-selected' : ''
                }`}
            style={{
                left: x,
                bottom: y,
                height,
                width,
            }}
            onClick={() => selectItem(container)}
            tabIndex={tabIndex}
        >
            <ContainerId
                id={id}
            />
        </div>
    );
});

// calculate selection prop to prevent rerendering on selection changes that don't affect this component
const mapSelection = _.memoize(({
    selection: {
        items,
        items: {
            length,
        },
    },
    container,
}) => ({
    selection: undefined,
    selected: items.includes(container),
    lastSelected: items[length - 1] === container,
}));

// scale inch values to pixels
const calculatePlacement = _.memoize(({
    container: {
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
}));

export default memo(withSelectionContext(
    transformProps(props => ({
        ...mapSelection(props),
        ...calculatePlacement(props),
    }))(Container)
));
