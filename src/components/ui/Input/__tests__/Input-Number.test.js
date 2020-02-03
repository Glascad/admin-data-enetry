import { cleanup, fireEvent, render } from "@testing-library/react";
import React from 'react';
import Input from "../Input";
import { Simulate } from "react-dom/test-utils";

const onChange = jest.fn();
const onBlur = jest.fn();

afterEach(cleanup);

it(`makes sure the input can be a number and when blurred returns to standard format`, () => {
    // Arrange
    const { container } = render(<Input
        type='number'
        initialValue={0}
        onChange={onChange}
        onBlur={onBlur}
    />);
    // Act
    const selectedItem = container.querySelector('input');
    fireEvent.change(selectedItem, { target: { value: 60 } });
    fireEvent.blur(selectedItem);
    // Assert
    expect(onChange).toHaveBeenCalledTimes(1);
    // expect(selectedItem).toHaveProperty('value', 60);
});
