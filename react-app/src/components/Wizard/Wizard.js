import React, { Component } from 'react';

import Batcher from '../Batcher/Batcher';
import ApolloWrapper from '../ApolloWrapper/ApolloWrapper';

import './Wizard.scss';

class Wizard extends Component {

    render = () => {

        const {
            props: {
                children,
                batcher: {
                    batchMutation,
                    resetMutations,
                    replaceMutation,
                    completeMutations,
                },
                apollo,
            },
        } = this;

        return (
            <div className="Wizard" >
                <header>
                    Wizard Header
                </header>
                <div className="card">
                    {children({
                        apollo,
                        batchMutation,
                        resetMutations,
                        replaceMutation,
                    })}
                    <div
                        className="button-wrapper"
                    >
                        <button
                            className="empty"
                            onClick={resetMutations}
                        >
                            Reset
                    </button>
                        <div
                            className="buttons-right"
                        >
                            <button
                                className="primary"
                                onClick={completeMutations}
                            >
                                Next
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default function ({
    apolloProps,
    ...props
}) {
    return (
        <Batcher>
            {batcher => (
                <ApolloWrapper
                    {...apolloProps}
                >
                    {apollo => (
                        <Wizard
                            batcher={batcher}
                            apollo={apollo}
                            {...props}
                        />
                    )}
                </ApolloWrapper>
            )}
        </Batcher>
    )
}
