import React from 'react';

import {
    Wizard,
    ApolloListWrapper,
    SelectionWrapper,
    HeadedListContainer,
    Pill,
} from '../../../components';

import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

import InputWrapper3 from '../../../components/ApolloInputWrapper/InputWrapper3'

import { query, mutations } from './system-options-graphql';

export default function ValidTypes({ match: { params: { systemNID } } }) {
    return (
        <Wizard
            mutations={mutations}
            query={{
                query,
                variables: {
                    nodeId: systemNID,
                },
            }}
        >
            {({
                queryStatus: {
                    data: {
                        system: {
                            id: systemId,
                            systemOptionsBySystemId: {
                                nodes: systemOptions = []
                            } = {}
                        } = {}
                    }
                },
                mutations: {
                    createSystemOption,
                }
            }) => (
                    <ListWrapper3
                        title="Valid Detail Types"
                        items={systemOptions}
                        mapPillProps={({
                            ...item
                        }) => ({
                            n: console.log(item)
                        })}
                    >
                        {({
                        }) => (
                                <InputWrapper3
                                    title="Option"
                                    inputs={[]}
                                />
                            )}
                    </ListWrapper3>
                )}
        </Wizard>
    );
}
