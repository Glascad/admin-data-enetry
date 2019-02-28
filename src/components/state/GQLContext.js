import React, { Component, createContext } from 'react';

import axios from 'axios';

const GQLContext = createContext();

export default class GQLProvider extends Component {

    state = {};

    fetchData = async queries => {
        const {
            props: {
                url,
            },
        } = this;

        const results = await Promise.all(Object.entries(queries)
            .map(async ([key, query]) => {

                try {

                    this.setState(() => ({
                        [key]: {
                            loading: true,
                            data: {},
                        },
                    }));

                    const { data: { data } } = await axios.post(url, { query });

                    this.setState(() => ({
                        [key]: {
                            loading: false,
                            data,
                        },
                    }));

                    return [key, data];

                } catch (error) {

                    this.setState(() => ({
                        [key]: {
                            loading: false,
                            data: {},
                            error,
                        },
                    }));

                }
            }));

        return results
            .reduce((results, [key, data]) => ({
                ...results,
                [key]: data,
            }));
    }

    mutate = mutations => {

    }

    render = () => {
        const {
            state,
            props: {
                children,
            },
            fetchData,
        } = this;

        const methods = {
            fetchData,
        };

        return (
            <GQLContext.Provider
                value={{
                    state,
                    methods,
                }}
            >
                {children}
            </GQLContext.Provider>
        );
    }
}

export class GQLConsumer extends Component {

    static contextType = GQLContext;

    componentDidMount = () => {
        const {
            props: {
                queries,
            },
            context: {
                methods: {
                    fetchData,
                },
            },
        } = this;

        fetchData(queries);
    }

    render = () => {
        const {
            props: {
                children,
            },
        } = this;

        return (
            <GQLContext.Consumer>
                {children}
            </GQLContext.Consumer>
        );
    }
}
