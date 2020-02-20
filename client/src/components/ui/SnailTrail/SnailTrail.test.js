import { cleanup, fireEvent, render, getByTestId } from "@testing-library/react";
import React from 'react';
import SnailTrail from "./SnailTrail";
import { Simulate } from "react-dom/test-utils";

afterEach(cleanup);

it('shows all the items in the trail', () => {

    const { container, getByText } = render(<SnailTrail
        trail={['first', 'second', 'third', 'fourth', 'fifth']}
    />);

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
    expect(getByText('Fourth')).toBeTruthy();
    expect(getByText('Fifth')).toBeTruthy();
    expect(container.querySelectorAll('.snail-trail-item').length).toBe(5);
});

// Doesn't account for OptionSelect for SnailTrail
