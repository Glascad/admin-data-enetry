import React, { useState } from 'react';
import { Query } from 'react-apollo';

import {
    query,
    create_part_type,
    update_part_type,
    delete_part_type,
} from './part-types-gql';

import {
    create_part_tag,
    update_part_tag,
    delete_part_tag,
} from './part-tags-gql';

import {
    HeadedListContainer,
    Pill,
    OldAsyncModal,
} from '../../../components';

const initialState = {
    nodeId: "",
    input: "",
    modal: {},
};

const modalProps = [
    {
        ...create_part_type,
        title: "New Part Type",
    },
    {
        ...create_part_tag,
        title: "New Part Tag",
    },
    {
        ...update_part_type,
        title: "Update Part Type",
    },
    {
        ...update_part_tag,
        title: "Update Part Tag",
    },
    {
        ...delete_part_type,
        title: "Delete Part Type",
        danger: true,
    },
    {
        ...delete_part_tag,
        title: "Delete Part Tag",
        danger: true,
    },
];

export default function PartTypes() {

    const [
        {
            nodeId: selectedNID,
            input,
            modal: {
                mutation: selectedMutation,
                update: selectedUpdate,
            },
        },
        setModalState
    ] = useState(initialState);

    const handleInput = ({ target: { value } }) => setModalState(state => ({
        ...state,
        input: value
    }));

    const cancelModal = () => setModalState(initialState);


    class Query extends Component {
        render() {
            /**
             * Some asynchronous stuff
             */
            return this.props.children({
                error,
                loading,
                data
            });
        }
    }

    return (
        <Query
            query={query}
            children={({
                loading,
                error,
                data: {
                    allPartTypes: {
                        nodes: types = []
                    } = {},
                    allPartTags: {
                        nodes: tags = []
                    } = {},
                } = {}
            }) => (
                    <div>
                        <HeadedListContainer
                            title="Part Types"
                            list={{
                                items: types,
                                addButton: {
                                    onAdd: () => setModalState({
                                        nodeId: "",
                                        input: "",
                                        modal: create_part_type
                                    })
                                },
                                renderItem: ({
                                    nodeId,
                                    type
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            nodeId={nodeId}
                                            tagname="li"
                                            title={type}
                                            selected={selectedNID === nodeId}
                                            danger={(
                                                selectedMutation === delete_part_type.mutation
                                                &&
                                                selectedNID === nodeId
                                            )}
                                            onSelect={() => setModalState({
                                                nodeId,
                                                input: type,
                                                modal: update_part_type
                                            })}
                                            onDelete={() => setModalState({
                                                nodeId,
                                                input: type,
                                                modal: delete_part_type
                                            })}
                                        />
                                    )
                            }}
                        />
                        <HeadedListContainer
                            title="Part Tags"
                            list={{
                                items: tags,
                                addButton: {
                                    onAdd: () => setModalState({
                                        nodeId: "",
                                        input: "",
                                        modal: create_part_tag
                                    })
                                },
                                renderItem: ({
                                    nodeId,
                                    tag
                                }) => (
                                        <Pill
                                            key={nodeId}
                                            nodeId={nodeId}
                                            tagname="li"
                                            title={tag}
                                            selected={selectedNID === nodeId}
                                            danger={(
                                                selectedMutation === delete_part_tag.mutation
                                                &&
                                                selectedNID === nodeId
                                            )}
                                            onSelect={() => setModalState({
                                                nodeId,
                                                input: tag,
                                                modal: update_part_tag
                                            })}
                                            onDelete={() => setModalState({
                                                nodeId,
                                                input: tag,
                                                modal: delete_part_tag
                                            })}
                                        />
                                    )
                            }}
                        />
                        {modalProps.map(({
                            mutation,
                            update,
                            ...props
                        }, i) => (
                                <OldAsyncModal
                                    key={i}
                                    mutation={mutation}
                                    variables={{
                                        nodeId: selectedNID,
                                        type: input,
                                        tag: input,
                                    }}
                                    display={selectedMutation === mutation}
                                    update={update}
                                    afterUpdate={cancelModal}
                                    onCancel={cancelModal}
                                    onReset={cancelModal}
                                    children={(
                                        <div>
                                            <h6>Name</h6>
                                            <input
                                                value={input}
                                                onChange={handleInput}
                                            />
                                        </div>
                                    )}
                                    non={console.log({ mutation, update, ...props })}
                                    {...props}
                                />
                            ))}
                    </div>
                )}
        />
    );
}


function Parent() {
    return (
        <button
            children="TEXT"
        />
    );
}

React.createElement('button', {
    ...props,
    children: React.createElement('div', {
        children: [
            React.createElement('button', {
                onClick: console.log
            })
        ]
    })
});

function Parent({ children }) {
    return (
        <button>
            TEXT
        </button>
    );
}

function GrandParent() {
    return (
        <Parent>
            CHILDREN
        </Parent>
    );
}

