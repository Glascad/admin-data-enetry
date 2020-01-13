import { render } from "@testing-library/react";
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import Input from "./Input";

describe(`Boolean Input working`, () => {

    test(`Clicking the boolean input will return the inverse of what is selected in the callback`, () => {
        const onChange = jest.fn();

        // Arrange
        const { container } = render(<Input
            type='switch'
            checked={true}
            onChange={onChange}
        />);

        // Act
        const selectedItem = container.querySelector('input');
        Simulate.change(selectedItem);

        // Assert
        expect(onChange).toHaveBeenCalledTimes(1);
    })
})