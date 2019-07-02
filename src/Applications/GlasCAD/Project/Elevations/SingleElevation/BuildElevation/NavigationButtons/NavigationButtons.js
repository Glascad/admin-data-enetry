import React from "react";

import { withRouter } from 'react-router-dom';

import "./NavigationButtons.scss";
import { parseSearch } from "../../../../../../../utils";


function NavigationButtons({
    history,
    match:{
        path,
    },
    location: {
        search,
    },
    project,
    project: {
        _elevations = [],
        _elevations: {
            length = 0,
        } = [],
    } = {},
}) {
    console.log(arguments[0]);
    const elevationIds = _elevations.map(({ id }) => id);
    const { elevationId } = parseSearch(search);
    const currentIndex = elevationIds.indexOf(+elevationId);
    const nextId = elevationIds[(currentIndex + 1) % length];
    const prevId = elevationIds[(currentIndex - 1) % length];
    return (
        <>
            {[["left", prevId], ["right", nextId]].map(([direction, id]) => (
                <div className={`NavigationButton ${direction}`}>
                    <button onClick={() => history.push(`${path}${parseSearch(search).update({ elevationId: id })}`)}>
                        <div />
                        <div />
                    </button>
                </div>
            ))}
        </>
    )
}

export default withRouter(NavigationButtons);