import React, { Component } from 'react';
import { Input } from '../../../components';

export default class InfillSizesGenerator extends Component {

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
                console.log({
                    start,
                    size,
                    end,
                    increment,
                })
                this.props.createItem({ variables: { size } });
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
                    label="Starting At"
                    type="number"
                    value={start}
                    onChange={handleChange('start')}
                />
                <Input
                    label="Ending At"
                    type="number"
                    value={end}
                    onChange={handleChange('end')}
                />
                <Input
                    label="In Increments Of"
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
