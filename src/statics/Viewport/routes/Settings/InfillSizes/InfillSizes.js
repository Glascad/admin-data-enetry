import React from 'react';
import { Query } from 'react-apollo';

import INFILL_SIZES_QUERY from './infill-sizes-query';

import { HeadedListContainer, Pill } from '../../../../../components';

export default function InfillSizes() {
    return (
        <Query
            query={INFILL_SIZES_QUERY}
        >
            {({
                loading,
                error,
                data: {
                    allInfillSizes: {
                        nodes: infillSizes = []
                    } = {}
                } = {}
            }) => (
                    <HeadedListContainer
                        id="InfillSizes"
                        title="Infill Sizes"
                        beforeList={(
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <div>
                                    <h6>Starting At</h6>
                                    <input
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <h6>Ending At</h6>
                                    <input
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <h6>In Increments Of</h6>
                                    <input
                                        type="number"
                                    />
                                </div>
                                <button>Generate</button>
                            </div>
                        )}
                        listItems={infillSizes}
                        renderListItem={({
                            size
                        }) => (
                                <Pill
                                    key={size}
                                    tagname="li"
                                    title={`${size}"`}
                                />
                            )}
                    />
                )}
        </Query>
    );
}
