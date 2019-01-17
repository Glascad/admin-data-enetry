import React, {
    Component,
    createRef,
} from 'react';
import Select from 'react-select';
import './Input.scss';

export default class Input extends Component {

    ref = createRef();

    componentDidUpdate = ({ initialValue }) => {
        const {
            props: {
                initialValue: newValue
            }
        } = this;
        if (initialValue !== newValue) {
            this.ref.current.value = newValue
        }
    }

    componentDidMount = () => this.componentDidUpdate({}, {});

    blurOnEnter = ({ key, target }) => key === 'Enter' && target.blur();

    render = () => {
        const {
            props: {
                tagname = "div",
                label,
                type = "text",
                select,
                value,
                initialValue,
                checked = false,
                ...props
            },
            ref,
            blurOnEnter,
        } = this;

        if (
            value !== undefined
            &&
            initialValue !== undefined
        ) {
            throw new Error("Cannot must provide either `initialValue` or `value` but not both");
        }

        const tag = {
            name: type === "checkbox" ? "label" : tagname
        };

        const LABEL = label ? (
            <div
                className="label"
            >
                {label}
            </div>
        ) : null;

        return (
            <tag.name
                className={`Input type-${type}`}
            >
                {type !== "checkbox" ? (
                    LABEL
                ) : null}
                {!select ? (
                    <input
                        ref={ref}
                        type={type}
                        value={initialValue === undefined ?
                            value || (
                                type === 'text' ?
                                    ""
                                    :
                                    type === "number" ?
                                        0
                                        :
                                        type === "checkbox" ?
                                            false
                                            :
                                            ""
                            )
                            :
                            undefined}
                        checked={checked}
                        onKeyDown={blurOnEnter}
                        {...props}
                    />
                ) : (
                        <Select
                            {...select}
                            ref={ref}
                            className={`Select ${select.isMulti ? "multi" : ""}`}
                        />
                    )}
                {type === "checkbox" ? (
                    <>
                        <span
                            className="check"
                        />
                        {LABEL}
                    </>
                ) : null}
            </tag.name>
        );
    }
}
