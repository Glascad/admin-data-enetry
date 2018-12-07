import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { query } from './practice-gql';

export default class Practice extends Component {
    state = {};
    render = () => {
        return (
            <Query 
                query={query}
            >
            {() => {
                return (
                    <div></div>
                )
            }} 
            </Query>
        )
    }
}