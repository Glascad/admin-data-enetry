import React from 'react';
import { Query } from 'react-apollo';
import './Linetypes.scss';

import LINETYPE_QUERY from './linetype-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function LineTypes() {
    return (
        <Query
            query={LINETYPE_QUERY}
        >
            {({
                loading,
                error,
                data: {
                    allLinetypes: {
                        nodes: linetypes = []
                    } = {},
                    allLineWeights: {
                        nodes: lineWeights = []
                    } = {}
                } = {}
            }) => (
                    <div>
                        <HeadedListContainer
                            id="Linetypes"
                            title="Linetypes"
                            sorts={[
                                {
                                    name: "Alphabetical",
                                    callback: () => 0,
                                }
                            ]}
                            listItems={linetypes}
                            renderListItem={({
                                nodeId,
                                id,
                                name,
                                lineWeight,
                                pattern,
                            }) => (
                                    <li
                                        key={nodeId}
                                        className="linetype"
                                    >
                                        <Pill
                                            title={name}
                                        />
                                        <svg
                                            height={lineWeight}
                                            width="240"
                                        >
                                            <line
                                                x1="0"
                                                y1="0"
                                                x2="240"
                                                y2="0"
                                                stroke="black"
                                                strokeWidth={lineWeight}
                                                strokeDasharray={pattern}
                                            />
                                        </svg>
                                    </li>
                                )}
                        />
                        <HeadedListContainer
                            id="LineWeights"
                            title="Line Weights"
                            sorts={[
                                {
                                    name: "Alphabetical",
                                    callback: () => 0,
                                }
                            ]}
                            listItems={lineWeights}
                            renderListItem={({
                                nodeId,
                                name,
                                weight,
                            }) => (
                                    <Pill
                                        key={nodeId}
                                        tagname="li"
                                        title={`${name} - ${weight}`}
                                    />
                                )}
                        />
                    </div>
                )}
        </Query>
    );
}