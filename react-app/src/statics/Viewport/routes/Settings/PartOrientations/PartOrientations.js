import React from 'react';
import { HeadedListContainer, Pill } from '../../../../../components';

export default function PartOrientations() {
    return (
        <HeadedListContainer
            id="PartOrientations"
            title="Part Orientations"
            sorts={[
                {
                    name: "Alphabetical",
                    callback: () => 0,
                }
            ]}
            listItems={[
                "top",
                "bottom",
                "front",
                "back",
                "left",
                "right"
            ]}
            renderListItem={item => (
                <Pill
                    key={item}
                    tagname="li"
                    title={item}
                />
            )}
        />
    );
}
