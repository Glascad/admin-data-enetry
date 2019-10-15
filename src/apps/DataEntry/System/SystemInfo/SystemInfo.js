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
        allSystemTypes = [],
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
        history.push(`${path.replace(/info/, 'build')}?systemId=${id}`);
    }

    return (
        <>
            <TitleBar
                title={systemId ?
                    fetching ?
                        <Ellipsis text="Loading" />
                        :
                        mName
                    :
                    "New System"}
                selections={systemId && !fetching ? [sName] : []}
                right={(
                    <>
                        <ConfirmButton
                            data-cy="cancel"
                            doNotConfirmWhen={true}
                            onClick={() => {
                                history.push(`${
                                    path.replace(/system\/info/, 'main-menu/manage-systems')
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
                    value={sType}
                    options={allSystemTypes.map(({ type }) => type)}
                    onChange={name => setSystemType(name)}
                />
                <Select
                    data-cy="manufacturer"
                    label="Manufacturer"
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
