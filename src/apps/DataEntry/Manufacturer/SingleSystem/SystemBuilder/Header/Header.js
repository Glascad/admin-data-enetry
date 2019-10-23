import React, { useState } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {
    TitleBar,
    Ellipsis,
    ConfirmButton,
    Input,
    AsyncButton,
} from '../../../../../../components';
import { parseSearch } from '../../../../../../utils';
import { Hamburger } from '../../../../../../assets/icons';

function Header({
    location: {
        search,
    },
    match: {
        path,
    },
    history,
    systemInput,
    system: {
        id,
        name: systemName = '',
        _manufacturer: {
            name: mnfgName = '',
        } = {},
    } = {},
    selectedItem: {
        __typename: selectedTypename,
    } = {},
    selectItem,
    save,
}) {

    const [saving, setSaving] = useState(false);
    const [savingAndExiting, setSavingAndExiting] = useState(false);

    const { systemId } = parseSearch(search);

    const inputIsEmpty = _.isEqual();

    return (
        <TitleBar
            className="blue-border"
            title={mnfgName || <Ellipsis text="Loading" />}
            selections={systemName ? [systemName] : []}
            left={(
                <>
                    <ConfirmButton
                        data-cy="system-info-link"
                        modalProps={{}}
                        doNotConfirmWhen={true}
                        onClick={() => {
                            history.push(`${
                                path.replace(/build/, 'info')
                                }${
                                search
                                }`);
                        }}
                    >
                        System Info
                    </ConfirmButton>
                    <Input
                        data-cy="settings-icon"
                        Icon={Hamburger}
                        checked={selectedTypename === 'Settings'}
                        onMouseDown={e => e.stopPropagation()}
                        onChange={() => selectItem(selectedTypename === 'Settings' ?
                            undefined
                            :
                            { __typename: 'Settings' }
                        )}
                    />
                </>
            )}
            right={(
                <>
                    <ConfirmButton
                        data-cy="close"
                        doNotConfirmWhen={true}
                        onClick={() => {
                            history.push(`${
                                path.replace(/single-system.*/, 'system-search')
                                }${
                                search
                                }`);
                        }}
                    >
                        Close
                    </ConfirmButton>
                    <AsyncButton
                        data-cy="save-and-close"
                        className="action"
                        onClick={async () => {
                            setSavingAndExiting(true);
                            await save();
                            setSavingAndExiting(false);
                            history.push(`${
                                path.replace(/single-system.*/, 'system-search')
                                }${
                                search
                                }`);
                        }}
                        loading={savingAndExiting}
                        loadingText="Saving"
                    >
                        Save and Close
                    </AsyncButton>
                    <AsyncButton
                        data-cy="save"
                        className="action"
                        onClick={async () => {
                            setSaving(true);
                            await save();
                            setSaving(false);
                        }}
                        loading={saving}
                        loadingText="Saving"
                    >
                        Save
                    </AsyncButton>
                </>
            )}
        />
    );
}

export default withRouter(Header);
