import React, { useState } from 'react';
import Statics from '../Statics/Statics';
import { TitleBar, Pill, ListWrapper, Tree, useQuery, RightSidebar, Input, GroupingBox, Toggle } from '../../components';

import './Practice.scss';

function Practice() {
    return (
        <div id="Practice">
            <TitleBar
                title="Test Options"
            />
            <RightSidebar
                open={true}
                View={{
                    title: "Sidebar",
                    component: () => (
                        <>
                            <TitleBar
                                title="Configurations"
                            />
                            {["Head", "Shim Support", "Compensating Receptor", "Infills"].map(ct => (
                                <Input
                                    label={ct}
                                    type="switch"
                                    checked={true}
                                />
                            ))}
                            {/* <GroupingBox
                                title="Compensating Receptor"
                            // switch={{}}
                            > */}
                            {/* <Toggle
                                    label="Durability"
                                    buttons={[
                                        {
                                            text: "Standard Duty",
                                        },
                                        {
                                            text: "High-Performance",
                                            selected: true,
                                        },
                                    ]}
                                    />
                                <Toggle
                                    label="Other Option"
                                    buttons={[
                                        {
                                            text: "Value 1",
                                            selected: true,
                                        },
                                        {
                                            text: "Value 2",
                                        },
                                    ]}
                                /> */}
                            {/* {["Standard Duty", "High-Performance"].map(ov => (
                                    <Input
                                        label={ov}
                                        type="switch"
                                    />
                                ))} */}
                            {/* </GroupingBox> */}
                            <TitleBar
                                title="Infills"
                            />
                        </>
                    )
                }}
            />
        </div>
    );
}


export default () => <Statics routes={{ Practice }} />
