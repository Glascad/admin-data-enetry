import { cleanup, fireEvent, render } from "@testing-library/react";
import React from 'react';
import Input from "../Input";

const onChange = jest.fn();
const onBlur = jest.fn();

afterEach(cleanup);

it(`makes sure the input can be a number and when blurred returns to standard format`, () => {
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
    fireEvent.blur(selectedItem);
    // Assert
    expect(selectedItem).toHaveProperty('value', `5'-0"`);
});

it(`makes sure the input can be a number and when blurred returns to standard format`, () => {
    // Arrange
    const { container } = render(<Input
        type='inches'
        initialValue={0}
        onChange={onChange}
        onBlur={onBlur}
    />);
    // Act
    const selectedItem = container.querySelector('input');
    fireEvent.change(selectedItem, { target: { value: `6'5"` } });
    fireEvent.blur(selectedItem);
    // Assert
    expect(selectedItem).toHaveProperty('value', `6'-5"`);
});
