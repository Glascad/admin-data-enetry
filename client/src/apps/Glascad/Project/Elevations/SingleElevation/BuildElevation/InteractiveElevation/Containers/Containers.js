import React, { memo } from 'react';
import Container from './Container';

export default memo(function Containers({
    containers,
    selectItem,
}) {
    return (
        <>
            {containers.map(container => (
                <Container
                    key={container.refId}
                    container={container}
                    selectItem={selectItem}
                />
            ))}
        </>
    );
});
