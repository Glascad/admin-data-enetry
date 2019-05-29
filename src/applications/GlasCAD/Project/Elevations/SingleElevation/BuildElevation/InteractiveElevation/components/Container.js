import React, { PureComponent } from 'react';


export default class Container extends PureComponent {

    handleClick = () => this.props.selectItem(this.props.container);

    render = () => {
        const {
            props: {
                container: {
                    refId,
                    customRoughOpening,
                    registerReactComponent,
                    placement: {
                        x,
                        y,
                        height,
                        width,
                    },
                },
                tabIndex,
            },
            handleClick,
        } = this;

        registerReactComponent(this);

        return (
            <div
                id={refId}
                className={`Container ${
                    customRoughOpening ?
                        'custom-rough-opening'
                        :
                        ''
                    }`}
                style={{
                    left: x,
                    bottom: y,
                    height,
                    width,
                }}
                onClick={handleClick}
                tabIndex={tabIndex}
            >
                <div className="text">
                    {
                        refId
                            .replace(/\D*/, '*')
                            .replace(/</, '*')
                            .replace(/>/, '*')
                            .split('*')
                            .filter(Boolean)
                            .map(text => (
                                <span>{text}</span>
                            ))
                        // .replace(/<.*/, '')
                    }
                </div>
            </div>
        );
    }
}
