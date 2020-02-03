import React from 'react';
import { TitleBar, AsyncButton } from '../../../../../../../../components';
import CancelButton from './CancelButton';
import CreateButton from './CreateButton';

export function Header({
    elevationInput,
    elevationInput: {
        name,
    },
    doNotConfirm,
    creating,
    save,
}) {
    return (
        <TitleBar
            // data-cy="new-elevation"
            title="New Elevation"
            snailTrail={[name]}
            right={(
                <>
                    <CancelButton
                        doNotConfirm={doNotConfirm}
                    />
                    <CreateButton
                        save={save}
                        elevationInput={elevationInput}
                        creating={creating}
                    />
                </>
            )}
        />
    );
}

export function Footer({
    doNotConfirm,
    saveDefault,
    savingDefault,
    elevationInput,
    creating,
    save,
}) {
    return (
        <div className="bottom-buttons">
            <CancelButton
                doNotConfirm={doNotConfirm}
            />
            <div className="buttons-right">
                <AsyncButton
                    data-cy="save-as-default-button"
                    className={`action ${doNotConfirm ?
                        'disabled'
                        :
                        ''
                        }`}
                    onClick={saveDefault}
                    loading={savingDefault}
                    loadingText="Saving"
                >
                    Save As Default
                </AsyncButton>
                <CreateButton
                    save={save}
                    elevationInput={elevationInput}
                    creating={creating}
                />
            </div>
        </div>
    );
}
