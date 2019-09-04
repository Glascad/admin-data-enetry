import React from 'react';
import { withRouter } from 'react-router-dom';
import { TitleBar, Ellipsis, ConfirmButton, AsyncButton, useQuery, useMutation, useInitialState, Input } from '../../../../components';
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
    queryStatus: {
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
                id: systemId,
                name: sName,
                manufacturerId: mId,
                systemType: sType,
            },
        });
        history.push(`${path}?systemId=${id}`);
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
                                    path.replace(/system\/info/, 'main-menu/system-search')
                                    }${
                                    search
                                    }`);
                            }}
                        >
                            Cancel
                        </ConfirmButton>
                        {systemId ? (
                            <ConfirmButton
                                data-cy="load"
                                className="action"
                                doNotConfirmWhen={true}
                                onClick={() => {
                                    history.push(`${
                                        path.replace(/info/, 'build')
                                        }${
                                        search
                                        }`);
                                }}
                            >
                                Load
                            </ConfirmButton>
                        ) : (
                                <AsyncButton
                                    className="action"
                                    data-cy="save"
                                    onClick={save}
                                    loading={updating}
                                >
                                    Save
                                </AsyncButton>
                            )}
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
                <Input
                    data-cy="system-type"
                    label="System Type"
                    select={{
                        value: {
                            value: sType,
                            label: sType,
                        },
                        options: allSystemTypes.map(({ type }) => ({
                            value: type,
                            label: type,
                        })),
                        onChange: ({ value }) => setSystemType(value),
                    }}
                />
                <Input
                    data-cy="manufacturer"
                    label="Manufacturer"
                    select={{
                        value: {
                            value: mId,
                            label: mName,
                        },
                        options: allManufacturers.map(({ name, id }) => ({
                            value: id,
                            label: name,
                        })),
                        onChange: ({ label, value }) => setMnfg([value, label]),
                    }}
                />
            </div>
        </>
    );
}

export default withRouter(SystemInfo);
