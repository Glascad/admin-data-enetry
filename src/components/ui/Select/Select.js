import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Select.scss';
import useInitialState from '../../hooks/use-initial-state';
import customPropTypes from '../../utils/custom-prop-types';
import { match, normalCase } from '../../../utils';

Select.propTypes = {
    label: PropTypes.string,
    selection: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
};

export default function Select({
    label,
    value,
    options,
    autoFocus = false,
    onChange,
}) {
    const [input, setInput] = useInitialState(value);
    const filteredOptions = options.filter(o => [...input].every(letter => o.toLowerCase().includes(letter.toLowerCase())));
    const { length: filteredOptionCount } = filteredOptions;
    const [selectedOptionIndex, setSelectedOptionIndex] = useInitialState(0, [input]);

    // const selectedOption = [
    //     o => o === input,
    //     o => o.toLowerCase() === input.toLowerCase(),
    //     o => [...input].reduce(([passed, index], letter) => [
    //         passed && o.slice(index).includes(letter),
    //         o.indexOf(letter),
    //     ], [true, 0])[0],
    //     o => [...input].reduce(([passed, index], letter) => [
    //         passed && o.slice(index).toLowerCase().includes(letter.toLowerCase()),
    //         o.toLowerCase().indexOf(letter.toLowerCase()),
    //     ], [true, 0])[0],
    //     o => [...input].every(letter => o.includes(letter)),
    //     o => [...input].every(letter => o.toLowerCase().includes(letter.toLowerCase())),
    //     () => true,
    // ].reduce((option, cb) => option || filteredOptions.find(cb), null);

    return (
        <label
            className="Select"
        >
            <div className="label">
                {label}
            </div>
            <input
                className="select-input"
                autoFocus={autoFocus}
                placeholder={value}
                value={input}
                onFocus={() => setInput('')}
                onBlur={() => setInput(value)}
                onChange={({ target: { value } }) => setInput(value)}
                onKeyDown={({ key, target }) => match(key).against({
                    Escape: () => target.blur(),
                    Enter: () => {
                        onChange(filteredOptions[selectedOptionIndex]);
                        target.blur();
                    },
                    ArrowUp: () => setSelectedOptionIndex(i => (filteredOptionCount + i - 1) % filteredOptionCount),
                    ArrowDown: () => setSelectedOptionIndex(i => (i + 1) % filteredOptionCount),
                })}
            />
            <div className="select-options">
                {filteredOptions.map((o, i) => (
                    <div
                        className={`select-option ${
                            i === selectedOptionIndex ? 'selected' : ''
                            }`}
                    >
                        {normalCase(o)}
                    </div>
                ))}
            </div>
        </label>
    );
}
