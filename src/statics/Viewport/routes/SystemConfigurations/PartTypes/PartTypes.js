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
    AsyncModal,
} from '../../../../../components';

export default function PartTypes() {

    const [displayCreateType, setDisplayCreateType] = useState({ nodeId: "" });
    const [displayUpdateType, setDisplayUpdateType] = useState({ nodeId: "" });
    const [displayDeleteType, setDisplayDeleteType] = useState({ nodeId: "" });
    const [displayCreateTag, setDisplayCreateTag] = useState({ nodeId: "" });
    const [displayUpdateTag, setDisplayUpdateTag] = useState({ nodeId: "" });
    const [displayDeleteTag, setDisplayDeleteTag] = useState({ nodeId: "" });

    const [input, setInput] = useState("");

    const cancelOtherModals = (...setModalFns) => () => ([
        setDisplayCreateType,
        setDisplayUpdateType,
        setDisplayDeleteType,
        setDisplayCreateTag,
        setDisplayUpdateTag,
        setDisplayDeleteTag,
    ]
        .filter(fn => !setModalFns.includes(fn))
        .forEach(fn => fn({ nodeId: "" })));

    const cancelAllModals = () => {
        cancelOtherModals()();
        setInput("");
    }

    const handleInput = ({ target: { value } }) => setInput(value);

    console.log({
        displayCreateType,
        displayUpdateType,
        displayDeleteType,
        displayCreateTag,
        displayUpdateTag,
        displayDeleteTag,
        input,
    });

    return (
        <Query
            query={query}
        >
            {({
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
                            listItems={types}
                            renderListItem={({
                                nodeId,
                                type
                            }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        tagname="li"
                                        title={type}
                                        onSelect={setDisplayUpdateType}
                                        onDelete={setDisplayDeleteType}
                                        onblur={cancelOtherModals(setDisplayUpdateType, setDisplayDeleteType)}
                                    />
                                )}
                        />
                        <HeadedListContainer
                            title="Part Types"
                            listItems={tags}
                            renderListItem={({
                                nodeId,
                                tag
                            }) => (
                                    <Pill
                                        key={nodeId}
                                        nodeId={nodeId}
                                        tagname="li"
                                        title={tag}
                                        onSelect={setDisplayUpdateTag}
                                        onDelete={setDisplayDeleteTag}
                                        onblur={cancelOtherModals(setDisplayUpdateTag, setDisplayDeleteTag)}
                                    />
                                )}
                        />
                        {[
                            {
                                ...create_part_type,
                                ...displayCreateType,
                            },
                            {
                                ...create_part_tag,
                                ...displayCreateTag,
                            },
                            {
                                ...update_part_type,
                                ...displayUpdateType,
                            },
                            {
                                ...update_part_tag,
                                ...displayUpdateTag,
                            },
                            {
                                ...delete_part_type,
                                ...displayDeleteType,
                            },
                            {
                                ...delete_part_tag,
                                ...displayDeleteTag,
                            },
                        ]
                            .map(({
                                nodeId,
                                mutation,
                                update,
                                ...props
                            }, i) => (
                                    <AsyncModal
                                        key={i}
                                        mutation={mutation}
                                        variables={{
                                            nodeId,
                                            type: input,
                                            tag: input,
                                        }}
                                        display={nodeId}
                                        update={(...args) => {
                                            update && update(...args);
                                            cancelAllModals();
                                        }}
                                        onCancel={cancelAllModals}
                                        {...props}
                                    >
                                        <div>
                                            <h6>Name</h6>
                                            <input
                                                value={input}
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </AsyncModal>
                                ))}
                    </div>
                )}
        </Query>
    );
}
