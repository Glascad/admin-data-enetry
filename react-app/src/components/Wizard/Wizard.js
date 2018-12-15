import React, { Component } from 'react';

import Batcher from '../Batcher/Batcher';
import ApolloWrapper3 from '../ApolloWrapper/ApolloWrapper3';

import './Wizard.scss';

class Wizard extends Component {

    render = () => {

        const {
            props: {
                children,
                batcher,
                batcher: {
                    batchMutation,
                    resetMutations,
                    replaceMutation,
                    completeMutations,
                },
                apollo,
            },
        } = this;

        console.log(apollo);

        return (
            <div className="Wizard" >
                <header>
                    Wizard Header
                </header>
                <div className="">
                    {children(apollo)}
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
    query,
    mutations,
    ...props
}) {
    return (
        <Batcher>
            {batcher => (
                <ApolloWrapper3
                    {...{
                        query,
                        mutations,
                        batcher,
                    }}
                >
                    {apollo => (
                        <Wizard
                            {...props}
                            batcher={batcher}
                            apollo={apollo}
                        />
                    )}
                </ApolloWrapper3>
            )}
        </Batcher>
    )
}
