import React, { PureComponent } from 'react';
import { Input } from '../../../../../components';

export default class InfillSizesGenerator extends PureComponent {

    state = {
        start: 0,
        end: 0,
        increment: 0,
    }

    handleChange = key => ({ target: { value } }) => this.setState({
        [key]: +value,
    });

    generate = () => {
        let {
            state: {
                start,
                start: size,
                end,
                increment,
            },
            PROTECTION = 30
        } = this;
        if (
            start > end
            ||
            start < 0
            ||
            end <= 0
            ||
            increment <= 0
        ) {
            return;
        }
        else {
            while (PROTECTION && size <= end + 0.00000005) {
                this.props.createItem({ size });
                size += increment;
                PROTECTION--;
            }
        }
    }

    render = () => {
        const {
            state: {
                start,
                end,
                increment,
            },
            handleChange,
            generate,
        } = this;

        return (
            <div
                id="InfillSizesGenerator"
            >
                <Input
                    label="Start"
                    type="number"
                    value={start}
                    onChange={handleChange('start')}
                />
                <Input
                    label="End"
                    type="number"
                    value={end}
                    onChange={handleChange('end')}
                />
                <Input
                    label="Increment"
                    type="number"
                    value={increment}
                    onChange={handleChange('increment')}
                />
                <button
                    onClick={generate}
                    className="empty"
                >
                    Generate
                </button>
            </div>
        );
    }
}
