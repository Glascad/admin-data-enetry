import React, { useState } from 'react';
import Statics from '../Statics/Statics';
import { TitleBar, Pill, ListWrapper, Tree } from '../../components';
import { logInputOutput } from '../../utils';

const option = "option";
const value = "value";
const detail = "detail";
const detailOption = "detail-option";
const detailOptionValue = "detail-option-value";
const configuration = "configuration";
const configurationOption = "configuration-option";
const configurationOptionValue = "configuration-option-value";

const trunk = {
    item: {
        type: option,
        name: "Set",
    },
    branches: [
        {
            item: {
                type: value,
                name: "Front",
            },
            branches: [],
        },
        {
            item: {
                type: value,
                name: "Back",
            },
            branches: [],
        },
        {
            item: {
                type: value,
                name: "Center",
            },
            branches: [
                {
                    item: {
                        type: option,
                        name: "Joinery",
                    },
                    branches: [
                        {
                            item: {
                                type: value,
                                name: "Screw Spline",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Head",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Stops",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: detailOptionValue,
                                                        name: "Up",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: detailOptionValue,
                                                        name: "Down",
                                                    },
                                                    branches: [
                                                        {
                                                            item: {
                                                                type: detailOption,
                                                                name: "Glazing",
                                                            },
                                                            branches: [
                                                                {
                                                                    item: {
                                                                        type: detailOptionValue,
                                                                        name: "Inside",
                                                                    },
                                                                    branches: [],
                                                                },
                                                                {
                                                                    item: {
                                                                        type: detailOptionValue,
                                                                        name: "Outside",
                                                                    },
                                                                    branches: [],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Shear Block",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Head",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Stops",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: detailOptionValue,
                                                        name: "Up",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: detailOptionValue,
                                                        name: "Down",
                                                    },
                                                    branches: [
                                                        {
                                                            item: {
                                                                type: detailOption,
                                                                name: "Glazing",
                                                            },
                                                            branches: [
                                                                {
                                                                    item: {
                                                                        type: detailOptionValue,
                                                                        name: "Inside",
                                                                    },
                                                                    branches: [],
                                                                },
                                                                {
                                                                    item: {
                                                                        type: detailOptionValue,
                                                                        name: "Outside",
                                                                    },
                                                                    branches: [],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            item: {
                                type: value,
                                name: "Stick",
                            },
                            branches: [
                                {
                                    item: {
                                        type: detail,
                                        name: "Head",
                                    },
                                    branches: [
                                        {
                                            item: {
                                                type: detailOption,
                                                name: "Stops",
                                            },
                                            branches: [
                                                {
                                                    item: {
                                                        type: detailOptionValue,
                                                        name: "Up",
                                                    },
                                                    branches: [],
                                                },
                                                {
                                                    item: {
                                                        type: detailOptionValue,
                                                        name: "Down",
                                                    },
                                                    branches: [
                                                        {
                                                            item: {
                                                                type: detailOption,
                                                                name: "Glazing",
                                                            },
                                                            branches: [
                                                                {
                                                                    item: {
                                                                        type: detailOptionValue,
                                                                        name: "Inside",
                                                                    },
                                                                    branches: [],
                                                                },
                                                                {
                                                                    item: {
                                                                        type: detailOptionValue,
                                                                        name: "Outside",
                                                                    },
                                                                    branches: [
                                                                        {
                                                                            item: {
                                                                                type: configuration,
                                                                                name: "Head",
                                                                            },
                                                                            branches: [
                                                                                {
                                                                                    item: {
                                                                                        type: configurationOption,
                                                                                        name: "Head Type",
                                                                                    },
                                                                                    branches: [
                                                                                        {
                                                                                            item: {
                                                                                                type: configurationOptionValue,
                                                                                                name: "Standard",
                                                                                            },
                                                                                        },
                                                                                        {
                                                                                            item: {
                                                                                                type: configurationOptionValue,
                                                                                                name: "High-Profile",
                                                                                            },
                                                                                        },
                                                                                        {
                                                                                            item: {
                                                                                                type: configurationOptionValue,
                                                                                                name: "Brake-Metal",
                                                                                            },
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            item: {
                type: value,
                name: "Multi-Plane",
            },
            branches: [],
        },
    ],
};

function Practice() {
    return (
        <>
            <TitleBar
                title="Test Options"
            />
            <Tree
                trunk={trunk}
                renderItem={logInputOutput('Render Item', ({ name, type }, { toggleOpen, level }) => (
                    <div
                        onClick={toggleOpen}
                        className={`type-${type}`}
                    >
                        <span>
                            {name}
                        </span>
                    </div>
                ))}
            />
        </>
    );
}


export default () => <Statics routes={{ Practice }} />
