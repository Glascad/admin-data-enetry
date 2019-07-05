import React from "react";

import _ from 'lodash';

import { withRouter } from 'react-router-dom';

import "./NavigationButtons.scss";
import { parseSearch } from "../../../../../../../utils";
import { ConfirmButton } from "../../../../../../../components";
import { defaultElevationInput } from "../BuildElevation";


function NavigationButtons({
    history,
    match: {
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
    elevationInput
}) {
    // CHANGE TO ITERATE THROUGH SAMPLE ELEVATIONS IF ON A SAMPLE ELEVATION OR BUG REPORT ELEVATIONS
    const elevationIds = _elevations.map(({ id }) => id);
    const { elevationId } = parseSearch(search);
    const currentIndex = elevationIds.indexOf(+elevationId);
    const nextId = elevationIds[(currentIndex + 1) % length];
    const prevId = elevationIds[(currentIndex + length - 1) % length];
    // console.log({ elevationIds, nextId, prevId });
    const doNotConfirm = _.isEqual(elevationInput, defaultElevationInput);
    const modalProps = {
        titleBar: {
            title: "Change Elevation",
        },
        children: (
            <>
                <div>
                    You have unsaved changes.
                </div>
                <div>
                    Are you sure you want to cancel your changes and leave this elevation?
                </div>
            </>
        ),
        cancel: {
            text: "Stay"
        },
        finish: {
            className: "danger",
            text: "Leave",
        },
    };
    return (
        <>
            {[["left", prevId], ["right", nextId]].map(([direction, id]) => (
                <div
                    className={`navigation-button-wrapper ${direction}`}
                    key={direction}
                >
                    <ConfirmButton
                        className="NavigationButton"
                        modalProps={modalProps}
                        onClick={() => history.push(`${
                            path
                            }${
                            parseSearch(search)
                                .update({ elevationId: id })
                                .remove("sampleElevation", "bugId")
                            }`)}
                        doNotConfirmWhen={doNotConfirm}
                    >
                        <div className="arrow" />
                        <div className="arrow" />
                    </ConfirmButton>
                </div>
            ))}
        </>
    )
}

export default withRouter(NavigationButtons);