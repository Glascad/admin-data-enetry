import React, { memo } from 'react';
import { transformProps } from '../../../../../../../../components';
import { pixelsPerInch } from '../../contexts/TransformContext';
import { withSelectionContext } from '../../contexts/SelectionContext';
import ContainerId from './ContainerId';

const Container = memo(function Container({
    container,
    container: {
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
            data-cy={`container-${refId.replace(/^\D*(\d+)\D.*$/, '$1')}`}
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
                refId={refId}
            />
        </div>
    );
});

export default withSelectionContext(
    // calculate selection prop to prevent rerendering on selection changes that don't affect this component
    transformProps(({
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
    }))(
        // scale inch values to pixels
        transformProps(({
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
        }))(
            Container
        )
    )
);
