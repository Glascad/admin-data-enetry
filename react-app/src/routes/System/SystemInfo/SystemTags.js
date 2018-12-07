import React from 'react';
import {
    ListContainer,
    Pill,
} from '../../../components';

export default function SystemTags({
    systemTags = [],
    addSystemTag,
}) {
    return (
        <ListContainer
            label="System Tags"
            items={systemTags}
            renderItem={({
                nodeId,
                type,
            }) => (
                    <Pill
                        key={nodeId}
                        title={type}
                    />
                )}
            addButtom={{
                onAdd: addSystemTag,
            }}
        />
    )
}
