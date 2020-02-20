import React from 'react';

export default (Component, nullWhen) => props => nullWhen(props) ? null : <Component {...props} />;
