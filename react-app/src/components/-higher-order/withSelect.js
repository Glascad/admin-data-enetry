import React from 'react';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';

export default (
    mapProps = withSelectProps => ({ withSelectProps })
) => (
    WrappedComponent
) => (
            props => (
                <SelectionWrapper>
                    {selectProps => (
                        <WrappedComponent
                            {...props}
                            {...mapProps(selectProps)}
                        />
                    )}
                </SelectionWrapper>
            )
        );
