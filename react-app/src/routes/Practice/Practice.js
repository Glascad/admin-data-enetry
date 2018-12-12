import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { query } from './practice-gql';
import ModalExample from './ModalExample';

export default class Practice extends Component {
    state = {};
    render = () => {
        return <ModalExample />
        // return (
        //     <Query 
        //         query={query}
        //     >
        //     {() => {
        //         return (
        //             <div></div>
        //         )
        //     }} 
        //     </Query>
        // )
    }
}
