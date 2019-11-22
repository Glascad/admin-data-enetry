import React from 'react';
import { withRouter } from 'react-router-dom';
import { TitleBar, Ellipsis, ConfirmButton, AsyncButton, useQuery, useMutation, useInitialState, Input, Select } from '../../../../components';
import { parseSearch } from '../../../../utils';

SystemInfo.navigationOptions = {
    path: '/info',
};

function SystemInfo({
    location: {
        search,
        state: {
            previousPath = '/data-entry/manufacturer/system-search',
            previousSearch = arguments[0].location.search,
        } = {},
    },
    match: {
        path,
    },
    history,
    fetching,
    queryResult: {
        _system: {
            id,
            name: systemName = "",
            _manufacturer: {
                id: mnfgId,
                name: mnfgName = "",
            } = {},
            systemType,
            sightline: sl,
        } = {},
        allManufacturers = [],
        systemTypes = [],
    },
    updateEntireSystem,
    updating,
}) {

    console.log(arguments[0]);

    const { systemId, manufacturerId } = parseSearch(search);

    const mName = mnfgName || (allManufacturers.find(({ id }) => `${id}` === manufacturerId) || {}).name

    const [sName, setSName] = useInitialState(systemName, [id]);
    const [sType, setSystemType] = useInitialState(systemType, [id]);
    const [sightline, setSightline] = useInitialState(sl, [id]);

    const save = async () => {
        if (
            (sName && sName !== systemName)
            ||
            (sType && sType !== systemType)
            ||
            (sightline && sightline !== sl)
        ) {
            const systemPayload = {
                id: +systemId,
                name: sName,
                manufacturerId: mnfgId,
                systemType: sType,
                sightline,
            };
            console.log({ systemPayload });
            const {
                updateEntireSystem: {
                    system: {
                        id,
                    },
                },
            } = await updateEntireSystem({ system: systemPayload });
            history.push(`${path.replace(/info/, 'build')}${parseSearch(search).update({ systemId: id })}`);
        } else {
            history.push(`${path.replace(/info/, 'build')}${parseSearch(search).update({ systemId })}`);
        }
    }

    console.log({ sightline });

    return (
        <>
            <TitleBar
                title={systemId ?
                    "System Info"
                    :
                    "New System"}
                snailTrail={fetching ? [
                    <Ellipsis text="Loading" />
                ] : [
                        mName,
                        systemId && sName,
                    ]}
                right={(
                    <>
                        <ConfirmButton
                            data-cy="cancel"
                            doNotConfirmWhen={true}
                            onClick={() => history.push(`${previousPath}${previousSearch}`)}
                        >
                            Cancel
                        </ConfirmButton>
                        <AsyncButton
                            className="action"
                            data-cy="save"
                            onClick={save}
                            loading={updating}
                        >
                            {systemId ? "Load" : "Save"}
                        </AsyncButton>
                    </>
                )}
            />
            <div className="card">
                <Input
                    data-cy="system-name"
                    label="System Name"
                    value={sName}
                    onChange={({ target: { value } }) => setSName(value)}
                />
                <Select
                    data-cy="system-type"
                    label="System Type"
                    readOnly={!!systemId}
                    value={sType}
                    options={systemTypes}
                    onChange={setSystemType}
                />
                <Input
                    data-cy="sightline"
                    label="Sightline"
                    type="inches"
                    value={sightline}
                    onChange={setSightline}
                />
            </div>
        </>
    );
}

export default withRouter(SystemInfo);
