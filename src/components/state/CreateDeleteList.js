import { Component } from 'react';

export default class CreateDeleteList extends Component {

    state = (this.props.lists || [this.props.list])
        .reduce((state, [createKey, deleteKey]) => ({
            ...state,
            [createKey]: [],
            [deleteKey]: [],
        }), {});

    keys = (this.props.lists || [this.props.list])
        .reduce((keys, [createKey, deleteKey]) => ({
            ...keys,
            [createKey]: deleteKey,
            [deleteKey]: createKey,
        }), {});

    createItem = () => { }

    deleteItem = () => { }

    render = () => {
        const {
            state,
            props: {
                children,
            },
        } = this;
        return children(state);
    }
}

function render() {
    return (
        <CreateDeleteList
            lists={[
                ["systemTagIds", "systemTagIdsToDelete"],
            ]}
            compare={(a, b) => a === b}
        >
            {({
                systemTagIds,
                systemTagIdsToDelete,

            }) => (
                    <>

                    </>
                )}
        </CreateDeleteList>
    )
}
