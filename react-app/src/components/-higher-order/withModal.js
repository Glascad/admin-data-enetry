import React, { Component } from 'react';
import { AsyncModal } from '../Modal/Modal';

export default function withModal(WrappedComponent, mapModalToProps) {

    return class WithModal extends Component {

        

        render = () => {
            const {
                props
            } = this;
            
            return (

                <WrappedComponent
                    {...props}
                    {...mapModalToProps()}
                />
            );
        }
    }
}
