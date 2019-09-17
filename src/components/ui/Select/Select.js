import React, { useEffect } from 'react';
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

    useEffect(() => {
        if (autoFocus) setInput('');
    }, [autoFocus]);

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
                onChange={({ target: { value } }) => setInput(value || '')}
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
