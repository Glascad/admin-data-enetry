import React from 'react';
import { Route } from 'react-router-dom';

export const links = {
    text: "Part Data",
    link: "/part-data",
    subroutes: [
        {
            text: "Part Data",
            link: "",
        }
    ]
};

export default function PartData() {
    return (
        "Part Data"
    );
}
