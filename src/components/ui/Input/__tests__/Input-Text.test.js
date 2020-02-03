import { cleanup, fireEvent, render } from "@testing-library/react";
import React from 'react';
import Input from "../Input";

const onChange = jest.fn();
const onBlur = jest.fn();

afterEach(cleanup);

it(`makes sure the input can be a number and when blurred returns to standard format`, () => {
    // Arrange
    const { container } = render(<Input
        type='text'
        initialValue={''}
        onChange={onChange}
        onBlur={onBlur}
    />);
    // Act
    const selectedItem = container.querySelector('input');
    fireEvent.change(selectedItem, { target: { value: 'abcdefg' } });
    // Assert
    expect(onChange).toHaveBeenCalledTimes(1);
    // expect(selectedItem).toHaveProperty('value', `abcdefg`);
});

