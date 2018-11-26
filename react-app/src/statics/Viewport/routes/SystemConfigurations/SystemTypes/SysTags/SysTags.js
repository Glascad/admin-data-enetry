import React from 'react';

import {
    HeadedListContainer,
    Pill
} from '../../../../../../components';

export default function SysTags({
    systemTags = []
}) {
    return (
        <div>
            <HeadedListContainer
                title="System Tags"
                list={{
                    items: systemTags,
                    renderItem: ({
                        nodeId,
                        type
                    }) => (
                            <Pill
                                key={nodeId}
                                tagname="li"
                                title={type}
                            />
                        )
                }}
            />
        </div>
    );
}