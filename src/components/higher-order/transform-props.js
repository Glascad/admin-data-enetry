import React, { memo } from 'react';

export default transformProps => WrappedComponent => memo(props => (
    <WrappedComponent
        {...props}
        {...transformProps(props)}
    />
));
