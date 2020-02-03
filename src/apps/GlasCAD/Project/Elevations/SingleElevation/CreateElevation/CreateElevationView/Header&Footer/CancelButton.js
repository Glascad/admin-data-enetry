import React from 'react';
import { withRouter } from 'react-router-dom';
import { ConfirmButton } from "../../../../../../../../components";

const cancelModalProps = {
    titleBar: {
        title: "Discard Elevation",
    },
    children: (
        <>
            <div>
                You have unfinished changes.
            </div>
            <div>
                Are you sure you want to discard your changes and leave this page ?
            </div>
        </>
    ),
    cancel: {
        text: "Stay",
    },
    finish: {
        className: "danger",
        text: "Leave",
    },
};

function CancelButton({
    location: {
        search,
    },
    match: {
        path,
    },
    history,
    doNotConfirm,
}) {

    return (
        <ConfirmButton
            data-cy="cancel-button"
            modalProps={cancelModalProps}
            onClick={() => history.push(`${
                path.replace(/\/elevation\/create-elevation/, '')
                }${
                search
                }`)}
            doNotConfirmWhen={doNotConfirm}
        >
            Cancel
        </ConfirmButton>
    );
}

export default withRouter(CancelButton);
