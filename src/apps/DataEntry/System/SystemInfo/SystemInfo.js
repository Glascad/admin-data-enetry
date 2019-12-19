import React from 'react';
import { withRouter } from 'react-router-dom';
import { AsyncButton, ConfirmButton, Ellipsis, TitleBar, useInitialState } from '../../../../components';
import { parseSearch } from '../../../../utils';
import SystemInfoInputs from '../modules/SystemInfoInputs';

SystemInfo.navigationOptions = {
    path: '/info',
};

function SystemInfo({
    location: {
        search,
        state: {
            previousPath = '/data-entry/manufacturer/system-search',
            previousSearch,
        } = {},
    },
    match: {
        path,
    },
    history,
    queryResult,
    queryResult: {
        allManufacturers = [],
        systemTypes = [],
    },
    systemInput,
    system,
    system: {
        name,
        _manufacturer: {
            name: mnfgName = "",
        } = {},
        systemType,
        sightline,
    },
    fetching,
    updating,
    dispatch,
    save,
}) {

    console.log(arguments[0]);

    const { systemId, manufacturerId } = parseSearch(search);

    const mName = mnfgName || (allManufacturers.find(({ id }) => `${id}` === manufacturerId) || {}).name;

    console.log({ sightline });

    const [] = useInitialState();

    const hasChanges = (
        systemInput.name
        ||
        systemInput.sightline
        ||
        systemInput.systemType
    );

    return (
        <>
            <TitleBar
                title={systemId === 'null' ?
                    "New System"
                    :
                    "System Info"}
                snailTrail={fetching ? [
                    <Ellipsis text="Loading" />
                ] : [
                        mName,
                        systemId !== 'null' && name,
                    ]}
                right={(
                    <>
                        <ConfirmButton
                            data-cy="cancel"
                            doNotConfirmWhen={true}
                            onClick={() => history.push(`${previousPath}${previousSearch || search}`)}
                        >
                            Cancel
                        </ConfirmButton>
                        <AsyncButton
                            className="action"
                            data-cy="save-load"
                            onClick={async () => {
                                const {
                                    updateEntireSystem: {
                                        system: {
                                            id = +systemId,
                                        } = {},
                                    } = {},
                                } = hasChanges ?
                                        await save()
                                        :
                                        {};

                                history.push(`${
                                    path.replace(/info/, 'build')
                                    }${
                                    parseSearch(search).update({ systemId: id })
                                    }`);
                            }}
                            loading={updating}
                        >
                            {hasChanges ? "Save" : "Load"}
                        </AsyncButton>
                    </>
                )}
            />
            <div className="card">
                <SystemInfoInputs
                    {...{
                        system,
                        queryResult,
                        dispatch,
                        doNotRenderManufacturer: true,
                    }}
                />
            </div>
        </>
    );
}

export default withRouter(SystemInfo);
