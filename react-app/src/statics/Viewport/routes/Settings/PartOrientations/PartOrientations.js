import React from 'react';
import { HeadedListContainer, Pill } from '../../../../../components';

export default function PartOrientations() {
    return (
        <HeadedListContainer
            id="PartOrientations"
            title="Part Orientations"
            list={{
                items: [
                    "top",
                    "bottom",
                    "front",
                    "back",
                    "left",
                    "right"
                ],
                renderItem: item => (
                    <Pill
                        key={item}
                        tagname="li"
                        title={item}
                    />
                )
            }}
        />
    );
}
