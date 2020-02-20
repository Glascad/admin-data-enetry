import React from 'react';
import { TitleBar, AsyncButton } from '../../../../../../../../components';
import CancelButton from './CancelButton';
import CreateButton from './CreateButton';

export default function HeaderAndFooter({
    children,
    elevationInput,
    elevationInput: {
        name,
    },
    doNotConfirm,
    save,
    creating,
    saveDefault,
    savingDefault,
}) {

    const HEADER = (
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

    const FOOTER = (
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

    return children({ HEADER, FOOTER });
}
