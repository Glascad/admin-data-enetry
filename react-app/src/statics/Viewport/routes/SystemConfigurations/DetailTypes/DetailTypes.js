import React, { Component } from 'react';
import {
    Query,
} from 'react-apollo';

import {
    HeadedListContainer,
    Pill,
} from '../../../../../components';

import CreateModal from './modals/Create';
import UpdateModal from './modals/Update';
import DeleteModal from './modals/Delete';

import {
    query,
} from './detail-types-gql';

export default class DetailTypes extends Component {

    state = {
        modalStatus: "",
        selectedDetailType: {}
    };

    cancelModal = () => this.setState({
        modalStatus: "",
        selectedDetailType: {}
    })

    renderCreateModal = () => this.setState({
        modalStatus: "create",
        selectedDetailType: {}
    });

    renderUpdateModal = ({ nodeId, type, vertical, entrance }) => this.setState({
        modalStatus: "update",
        selectedDetailType: {
            nodeId,
            type,
            vertical,
            entrance
        }
    });

    renderDeleteModal = ({ nodeId, type, vertical, entrance }) => this.setState({
        modalStatus: "delete",
        selectedDetailType: {
            nodeId,
            type,
            vertical,
            entrance,
        }
    });

    render = () => {
        const {
            state: {
                modalStatus,
                selectedDetailType,
                selectedDetailType: {
                    nodeId: selectedNID,
                },
            },
            cancelModal,
            renderCreateModal,
            renderUpdateModal,
            renderDeleteModal,
        } = this;

        return (
            <Query
                query={query}
            >
                {({
                    loading,
                    error,
                    data: {
                        allDetailTypes: {
                            nodes: detailTypes = [],
                        } = {},
                    } = {},
                }) => (
                        <div>
                            <HeadedListContainer
                                title="Detail Types"
                                list={{
                                    items: detailTypes,
                                    addButton: {
                                        onAdd: renderCreateModal
                                    },
                                    renderItem: ({
                                        nodeId,
                                        type,
                                        vertical,
                                        entrance,
                                    }) => (
                                            <Pill
                                                key={nodeId}
                                                nodeId={nodeId}
                                                tagname="li"
                                                title={type}
                                                selected={nodeId === selectedNID}
                                                danger={nodeId === selectedNID && modalStatus === "delete"}
                                                type={type}
                                                vertical={vertical}
                                                entrance={entrance}
                                                onDelete={renderDeleteModal}
                                                onEdit={renderUpdateModal}
                                            />
                                        )
                                }}
                            />
                            <CreateModal
                                display={modalStatus === "create"}
                                onCancel={cancelModal}
                            />
                            <UpdateModal
                                display={modalStatus === "update"}
                                onCancel={cancelModal}
                                selectedDetailType={selectedDetailType}
                            />
                            <DeleteModal
                                display={modalStatus === "delete"}
                                onCancel={cancelModal}
                                selectedDetailType={selectedDetailType}
                            />
                        </div>
                    )}
            </Query>
        );
    }
}
