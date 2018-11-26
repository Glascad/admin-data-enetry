import React from 'react';

import {
    Mutation
} from 'react-apollo';

import {
    NewModal,
} from '../../../../../../components';

import { delete_detail_type } from '../detail-types-gql';

const {
    mutation,
    update,
} = delete_detail_type;

export default function Delete({
    onCancel,
    onReset,
    selectedDetailType: {
        nodeId,
        type,
        vertical,
        entrance,
    },
    ...props
}) {
    return (
        <NewModal
            {...props}
            onCancel={onCancel}
            title={`Delete Detail Type - ${type}`}
            buttons={{
                right: (
                    <Mutation
                        mutation={mutation}
                        update={(...args) => {
                            update(...args);
                            onCancel();
                        }}
                    >
                        {mutate => (
                            <span>
                                <button
                                    className="empty light"
                                    onClick={onCancel}
                                >
                                    Cancel
                                    </button>
                                <button className="danger"
                                    onClick={e => {
                                        e.stopPropagation();
                                        mutate({ variables: { nodeId } });
                                    }}
                                >
                                    DELETE
                                </button>
                            </span>
                        )}
                    </Mutation>
                )
            }}
        >
            <h1>Are you sure you want to delete detail type: "{type}"?</h1>
            <h2>Vertical: {String(vertical)}</h2>
            <h2>Entrance: {String(entrance)}</h2>
        </NewModal>
    );
}
