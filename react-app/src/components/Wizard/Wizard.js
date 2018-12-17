import React, { Component } from 'react';

import Batcher from '../Batcher/Batcher';
import ApolloWrapper3 from '../ApolloWrapper/ApolloWrapper3';

import './Wizard.scss';

class Wizard extends Component {

    render = () => {

        const {
            props: {
                title,
                buttons,
                children,
                apollo,
                apollo: {
                    batcher: {
                        resetMutations,
                        completeMutations,
                    },
                }
            },
        } = this;

        // console.log(apollo);

        return (
            <div className="Wizard" >
                <header>
                    <h1>{title}</h1>
                    <div className="title-buttons">
                        {buttons}
                        <button
                            onClick={completeMutations}
                        >
                            Save
                        </button>
                    </div>
                </header>
                <div className="card">
                    {children(apollo)}
                    <div
                        className="bottom-buttons"
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
    extractTitle = () => "",
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
                            title={extractTitle(apollo.queryStatus)}
                            apollo={apollo}
                        />
                    )}
                </ApolloWrapper3>
            )}
        </Batcher>
    )
}
