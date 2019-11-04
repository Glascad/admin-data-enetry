import React from 'react';
import { withRouter } from 'react-router-dom';
import { TitleBar, Ellipsis, ConfirmButton, AsyncButton, useQuery, useMutation, useInitialState, Input, Select } from '../../../../../components';
import { parseSearch } from '../../../../../utils';

SystemInfo.navigationOptions = {
    path: '/info',
};

function SystemInfo({
    location: {
        search,
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
        } = {},
        allManufacturers = [],
        systemTypes = [],
    },
    updateEntireSystem,
    updating,
}) {

    console.log(arguments[0]);

    const { systemId } = parseSearch(search);

    const [sName, setSName] = useInitialState(systemName, [id]);
    const [[mId, mName], setMnfg] = useInitialState([mnfgId, mnfgName], [id]);
    const [sType, setSystemType] = useInitialState(systemType, [id]);

    const save = async () => {
        if (
            (sName && sName !== systemName)
            ||
            (mId && mId !== mnfgId)
            ||
            (sType && sType !== systemType)
        ) {
            const {
                updateEntireSystem: {
                    system: {
                        id,
                    },
                },
            } = await updateEntireSystem({
                system: {
                    id: +systemId,
                    name: sName,
                    manufacturerId: mId,
                    systemType: sType,
                },
            });
            history.push(`${path.replace(/info/, 'build')}${parseSearch(search).update({ systemId: id })}`);
        } else {
            history.push(`${path.replace(/info/, 'build')}${parseSearch(search).update({ systemId })}`);
        }
    }

    return (
        <>
            <TitleBar
                title={systemId ?
                    "System Info"
                    :
                    "New System"}
                selections={fetching ? [
                    <Ellipsis text="Loading" />
                ] : systemId ? [
                    mName,
                    sName,
                ] : []}
                right={(
                    <>
                        <ConfirmButton
                            data-cy="cancel"
                            doNotConfirmWhen={true}
                            onClick={() => {
                                history.push(`${
                                    path.replace(/single-system.*/, 'system-search')
                                    }${
                                    search
                                    }`);
                            }}
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
                    onChange={name => setSystemType(name)}
                    />
                <Select
                    data-cy="manufacturer"
                    label="Manufacturer"
                    readOnly={!!systemId}
                    value={mName}
                    options={allManufacturers.map(({ name }) => name)}
                    onChange={newName => setMnfg([
                        allManufacturers.reduce((found, { id, name }) => found || (name === newName && id), 0),
                        newName,
                    ])}
                />
            </div>
        </>
    );
}

export default withRouter(SystemInfo);
