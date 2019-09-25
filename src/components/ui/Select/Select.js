import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compareTwoStrings, findBestMatch } from 'string-similarity';
import useInitialState from '../../hooks/use-initial-state';
import customPropTypes from '../../utils/custom-prop-types';
import { match, normalCase, unique } from '../../../utils';

import './Select.scss';

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
};

export default function Select({
    label,
    value = '',
    options = [],
    autoFocus = false,
    onChange,
    "data-cy": dataCy,
    className,
}) {
    const [input, setInput] = useInitialState(normalCase(value));
    const filteredOptions = unique(options.concat(value))
        .filter(o => [...input].every(letter => o.toLowerCase().includes(letter.toLowerCase())))
        .reduce((sorted, next, i, arr) => sorted.concat(
            findBestMatch(
                input,
                arr.filter(item => !sorted.includes(item))).bestMatch.target
        ), []);
    const { length: filteredOptionCount } = filteredOptions;
    const [selectedOptionIndex, setSelectedOptionIndex] = useInitialState(0, [input]);

    const selectOption = i => onChange(filteredOptions[i]);

    useEffect(() => {
        if (autoFocus) setInput('');
    }, [autoFocus]);

    return (
        <div
            className={`Input Select ${className}`}
            data-cy={dataCy}
        >
            {label ? (
                <div className="label">
                    {normalCase(label)}
                </div>
            ) : null}
            <div className="select-input-wrapper">
                <input
                    className="select-input"
                    data-cy={`${dataCy} ${value.toLowerCase()}`}
                    autoFocus={autoFocus}
                    placeholder={normalCase(value)}
                    value={input}
                    onFocus={() => setInput('')}
                    onBlur={() => setInput(normalCase(value))}
                    onChange={({ target: { value } }) => setInput(value || '')}
                    onKeyDown={({ key, target }) => match(key).against({
                        Escape: () => target.blur(),
                        Enter: () => {
                            selectOption(selectedOptionIndex);
                            target.blur();
                        },
                        ArrowUp: () => setSelectedOptionIndex(i => (filteredOptionCount + i - 1) % filteredOptionCount),
                        ArrowDown: () => setSelectedOptionIndex(i => (i + 1) % filteredOptionCount),
                        Home: () => setSelectedOptionIndex(0),
                        End: () => setSelectedOptionIndex(filteredOptionCount - 1),
                    }).otherwise(() => console.log({ key }))}
                />
            </div>
            <div className="select-options">
                {filteredOptions.map((o, i) => (
                    <div
                        key={o}
                        data-cy={`select-option-${o}`}
                        className={`select-option ${
                            i === selectedOptionIndex ? 'selected' : ''
                            }`}
                        onMouseDown={() => {
                            selectOption(i);
                            document.activeElement.blur();
                        }}
                    >
                        {normalCase(o)}
                    </div>
                ))}
            </div>
        </div>
    );
}
