import React from 'react';
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Input from './Input';
import { Simulate } from 'react-dom/test-utils';


describe(`Feet-Inch Input working`, () => {

    test(`Feet-Inch Input can be changed`, () => {
        const onChange = jest.fn();
        const onBlur = jest.fn();

        // Arrange
        const { container } = render(<Input
            type='inches'
            initialValue={0}
            onChange={onChange}
            onBlur={onBlur}
        />);

        // Act
        const selectedItem = container.querySelector('input');
        fireEvent.change(selectedItem, { target: { value: 60 } });
        // Assert
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(selectedItem).toHaveProperty('value', "60")
        fireEvent.change(selectedItem, { target: { value: `5'6"` } });
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(selectedItem).toHaveProperty('value', `5'6"`)
    })
})
