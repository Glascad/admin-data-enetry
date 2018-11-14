import React from 'react';
import HeadedListContainer from '../../../../../components/HeadedListContainer/HeadedListContainer';
import Pill from '../../../../../components/Pill/Pill';

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
