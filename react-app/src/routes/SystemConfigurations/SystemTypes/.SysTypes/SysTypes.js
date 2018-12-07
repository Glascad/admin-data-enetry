import React, { Component } from 'react';

import {
    HeadedListContainer,
    Pill,
} from '../../../../components';

import DetailTypes from './DetailTypes/DetailTypes';

import CreateModal from './modals/Create';

export default class SysTypes extends Component {

    state = {
        modalStatus: "",
        selectedSystemType: {},
    };

    cancelModal = () => this.setState({
        modalStatus: ""
    });

    renderCreateModal = () => this.setState({
        modalStatus: "create"
    });

    renderUpdateModal = ({ arguments: selectedSystemType }) => this.setState({
        modalStatus: "update",
        selectedSystemType,
    });

    renderDeleteModal = ({ arguments: selectedSystemType}) => this.setState({
        modalStatus: "delete",
        selectedSystemType,
    });

    selectSystemType = ({ arguments: selectedSystemType }) => this.setState({
        selectedSystemType
    });

    render = () => {
        const {
            state: {
                selectedSystemType,
                modalStatus,
            },
            props: {
                systemTypes
            },
            cancelModal,
            renderCreateModal,
            selectSystemType,
        } = this;

        return (
            <div>
                <HeadedListContainer
                    title="System Types"
                    list={{
                        items: systemTypes,
                        addButton: {
                            onAdd: renderCreateModal
                        },
                        renderItem: ({
                            nodeId,
                            type,
                            ...systemType
                        }) => (
                                <Pill
                                    key={nodeId}
                                    arguments={{
                                        nodeId,
                                        type,
                                        ...systemType
                                    }}
                                    tagname="li"
                                    title={type}
                                    selected={nodeId === selectedSystemType.nodeId}
                                    onSelect={selectSystemType}
                                />
                            )
                    }}
                />
                <CreateModal
                    display={modalStatus === "create"}
                    onCancel={cancelModal}
                />
                <DetailTypes
                    systemType={selectedSystemType}
                />
            </div>
        );
    }
}
