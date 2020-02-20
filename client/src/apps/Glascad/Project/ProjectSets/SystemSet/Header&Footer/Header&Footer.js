import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { AsyncButton, ConfirmButton, TitleBar } from '../../../../../../components';
import { asyncPipe, asyncTap, parseSearch } from '../../../../../../utils';

export default function HeaderAndFooter({
    save,
    updating,
    fetchingProject,
    systemSetName,
    children,
}) {

    const history = useHistory();
    const { path } = useRouteMatch();
    const { search } = useLocation();
    const { systemSetId } = parseSearch(search);

    const saveAndClose = () => asyncPipe(
        save(),
        asyncTap(({ updateEntireSystemSet: { systemSet: { id } } }) => history.push(`${
            path.replace(/system-set.*/, 'all')
            }${
            parseSearch(search).update({ systemSetId: id })
            }`)),
    );

    const close = () => history.push(`${path.replace(/system.set/, 'all')}${search}`);

    const CLOSE = (
        <ConfirmButton
            doNotConfirmWhen={true}
            onClick={close}
        >
            Close
        </ConfirmButton>
    );

    const SAVE_AND_CLOSE = (
        <AsyncButton
            onClick={saveAndClose}
            className="action"
            loadingText="Saving"
            loading={updating || fetchingProject}
        >
            Save and Close
        </AsyncButton>
    );

    const SAVE = (
        <AsyncButton
            onClick={save}
            className="action"
            loadingText="Saving"
            loading={updating || fetchingProject}
        >
            Save
        </AsyncButton>
    );

    const HEADER = (
        <TitleBar
            title={`${systemSetId ? '' : 'New '}System Set`}
            snailTrail={[systemSetName]}
            right={(
                <>
                    {CLOSE}
                    {SAVE_AND_CLOSE}
                    {SAVE}
                </>
            )}
        />
    );

    const FOOTER = (
        <div className="bottom-buttons">
            {CLOSE}
            <div className="buttons-right">
                {SAVE_AND_CLOSE}
                {SAVE}
            </div>
        </div>
    );

    return children({ HEADER, FOOTER });
}
