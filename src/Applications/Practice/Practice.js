import React, { useState } from 'react';
import Statics from '../Statics/Statics';
import { TitleBar, Pill, ListWrapper, Tree, useQuery } from '../../components';
import { logInputOutput } from '../../utils';
import gql from 'graphql-tag';
import F from '../../schema';

import './Practice.scss';

const option = "option";
const value = "value";
const detail = "detail";
const detailOption = "detail-option";
const detailValue = "detail-option-value";
const configuration = "configuration";
const configurationOption = "configuration-option";
const configurationValue = "configuration-option-value";

const query = gql`
{
    systemById(id:1) {
        ...EntireSystem
    }
}
    ${F.SYS.ENTIRE_SYSTEM}
`;

const trunk = {
    item: {
        type: option,
        name: "System Option",
    },
    branches: [1, 2, 3].map(n => ({
        item: {
            type: value,
            name: `Value ${n}`,
        },
        branches: [
            {
                item: {
                    type: option,
                    name: "System Option",
                },
                branches: [1, 2, 3].map(n => ({
                    item: {
                        type: value,
                        name: `Value ${n}`,
                    },
                    branches: [
                        {
                            item: {
                                type: option,
                                name: "System Option",
                            },
                            branches: [1, 2, 3].map(n => ({
                                item: {
                                    type: value,
                                    name: `Value ${n}`,
                                },
                                branches: [
                                    {
                                        item: {
                                            type: option,
                                            name: "System Option",
                                        },
                                        branches: [1, 2, 3].map(n => ({
                                            item: {
                                                type: value,
                                                name: `Value ${n}`,
                                            },
                                            branches: ['Head', 'Horizontal', 'Sill'].map(name => ({
                                                item: {
                                                    type: detail,
                                                    name,
                                                },
                                                open: false,
                                                branches: [
                                                    {
                                                        item: {
                                                            type: detailOption,
                                                            name: "Detail Option",
                                                        },
                                                        branches: [1, 2, 3].map(n => ({
                                                            item: {
                                                                type: detailValue,
                                                                name: `Value ${n}`,
                                                            },
                                                            branches: [
                                                                {
                                                                    item: {
                                                                        type: detailOption,
                                                                        name: "Detail Option",
                                                                    },
                                                                    branches: [1, 2, 3].map(n => ({
                                                                        item: {
                                                                            type: detailValue,
                                                                            name: `Value ${n}`,
                                                                        },
                                                                        branches: [1, 2, 3].map(n => ({
                                                                            item: {
                                                                                type: configuration,
                                                                                name: `Config ${n}`,
                                                                            },
                                                                            branches: [
                                                                                {
                                                                                    item: {
                                                                                        type: configurationOption,
                                                                                        name: "Config Option",
                                                                                    },
                                                                                    open: false,
                                                                                    branches: [1, 2, 3].map(n => ({
                                                                                        item: {
                                                                                            type: configurationValue,
                                                                                            name: n,
                                                                                        },
                                                                                    })),
                                                                                },
                                                                            ],
                                                                        })),
                                                                    })),
                                                                },
                                                            ],
                                                        })),
                                                    },
                                                ],
                                            })),
                                        })),
                                    },
                                ],
                            })),
                        },
                    ],
                })),
            },
        ],
    })),
};

console.log(trunk);

function Practice() {
    const [fetch, queryStatus] = useQuery({ query });
    console.log(queryStatus);
    setTimeout(() => console.log(queryStatus));
    const {
        _system,
        _system: {
            _systemOptions = [],
            _detailOptions = [],
            _configurationOptions = [],
        } = {},
    } = queryStatus;
    const firstItem = _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId) || {};
    const treeTrunk = {
        item: firstItem,
        branches: (firstItem._systemOptionValues || []).map(item => {
            const {
                branchItems,
                branchType,
            } = item._systemDetailTypes && item._systemDetailTypes.length ?
                    {
                        branchType: "detailType",
                        branchItems: item._systemDetailTypes
                    } : {
                        branchType: "systemOption",
                        branchItems: _systemOptions.filter(({ parentSystemOptionValueId }) => parentSystemOptionValueId === item.id),
                    };
            return {
                item,
                branches: branchItems.map(item => ({
                    item,
                    branches: branchType === "detailType" ? (
                        _detailOptions.map(item => ({
                            item,
                        }))
                    ) : ([]),
                })),
            };
        }),
    };
    return (
        <div id="Practice">
            <TitleBar
                title="Test Options"
            />
            <Tree
                trunk={trunk}
                renderItem={(item, props) => (
                    <div
                        onClick={() => {
                            if (props.toggleOpen) props.toggleOpen();
                            console.log({ item, props });
                        }}
                        className={`type-${item.type}`}
                    >
                        <span>
                            {item.name}
                        </span>
                    </div>
                )}
            />
        </div>
    );
}


export default () => <Statics routes={{ Practice }} />
