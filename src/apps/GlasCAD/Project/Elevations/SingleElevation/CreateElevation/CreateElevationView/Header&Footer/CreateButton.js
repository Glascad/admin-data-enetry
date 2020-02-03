import React from 'react';
import { AsyncButton } from "../../../../../../../../components";

export default function CreateButton({
    elevationInput: {
        name,
        startingBayQuantity,
        systemSetId,
    },
    save,
    creating,
}) {

    return (
        <AsyncButton
            data-cy="create-button"
            className={`action ${name && systemSetId && startingBayQuantity ? '' : 'disabled'}`}
            onClick={save}
            loading={creating}
            loadingText="Creating"
        >
            Create
        </AsyncButton>
    );
}
