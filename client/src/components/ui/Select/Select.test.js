import { cleanup, fireEvent, render, getByTestId } from "@testing-library/react";
import React from 'react';
import Select from "./Select";
import { Simulate } from "react-dom/test-utils";

afterEach(cleanup);

it('allows the user to interact with the selection box by selecting an option', () => {
    const onChange = jest.fn();

    // Arrange
    const { container, getByText } = render(<Select
        value="Select-Item"
        options={['aaa', 'bbb', 'ccc', 'abc']}
        onChange={onChange}
    />);
    const selectedItem = container.querySelector('.select-input');

    // Having nothing focused doesn't show up
    expect(getByText('Select-item')).toBeTruthy();
    expect(container.querySelectorAll('.select-option').length).toBe(1);

    // Act
    fireEvent.focus(selectedItem);

    // Assert
    expect(getByText('Aaa')).toBeTruthy();
    expect(getByText('Bbb')).toBeTruthy();
    expect(getByText('Ccc')).toBeTruthy();
    expect(getByText('Abc')).toBeTruthy();

});

it('allows the user to interact with the selection box by Typing in an option', () => {
    const onChange = jest.fn();

    // Arrange
    const { container, getByText } = render(<Select
        value="Select-Item"
        options={['aaa', 'bbb', 'ccc', 'abc']}
        onChange={onChange}
    />);
    const selectedItem = container.querySelector('.select-input');

    // Act
    fireEvent.focus(selectedItem);
    fireEvent.change(selectedItem, { target: { value: 'a' } })

    // Assert
    expect(getByText('Aaa')).toBeTruthy();
    expect(getByText('Abc')).toBeTruthy();
    expect(container.querySelectorAll('.select-option').length).toBe(2);

});