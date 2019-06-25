import React from 'react';

import { TitleBar } from '../../../../../../../../../components';

import "./HotKeys.scss";

export default {
    title: "Hot Keys",
    component: HotKeys,
};

const hotKeys = [
    {
        label: "Selection",
        keys: [[
            "up",
            "down",
            "left",
            "right",
        ]],
    },
    {
        label: "Multi-selection",
        keys: [
            [
                "shift"
            ],
            [
                "up",
                "down",
                "left",
                "right",
            ],
        ]
    },
    {
        label: "Cancel selection",
        keys: [[
            "esc"
        ]]
    },
    {
        label: "Undo",
        keys: [
            [
                "ctrl",
            ],
            [
                "z",
            ],
        ]
    },
    {
        label: "Redo",
        keys: [
            [
                "ctrl",
            ],
            [
                "shft",
            ],
            [
                "z",
            ],
        ]
    },
    {
        label: "Zoom",
        keys: [
            [
                "spc",
            ],
            [
                "up",
                "down",
            ],
        ]
    },
    {
        label: "Pan",
        keys: [
            [
                "spc",
            ],
            [
                "drag",
            ],
        ]
    },
    {
        label: "Save",
        keys: [
            [
                "ctrl",
            ],
            [
                "s",
            ],
        ]
    },

]

function HotKeys() {
    return (
        <>
            <TitleBar
                title="Hot Keys"
            />
            {hotKeys.map(({ label, keys }) => (
                <div className="hot-key-wrapper">
                    <div className="label">{label}</div>
                    <div className="hot-key-group">
                        <div className="hot-key-group">
                            {keys.map((keyGroup, i) => (
                                <>
                                    {i === 0 ?
                                        null
                                        :
                                        <div>+</div>
                                    }
                                    {keyGroup.map(key => (
                                        <div className={`hot-key ${key}`}>
                                            {key}
                                        </div>
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}