import React from 'react';
import SelectionWrapper from '../SelectionWrapper/SelectionWrapper';

export default (
    mapProps = selection => ({ selection })
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
