import React from 'react';
import { withRouter } from 'react-router-dom';
import { AsyncButton, ConfirmButton, Ellipsis, Input, Select, TitleBar } from '../../../../components';
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
    system: {
        name,
        _manufacturer: {
            name: mnfgName = "",
        } = {},
        systemType,
        sightline,
    },
    queryResult: {
        allManufacturers = [],
        systemTypes = [],
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
                            onClick={() => history.push(`${previousPath}${previousSearch}`)}
                        >
                            Cancel
                        </ConfirmButton>
                        <AsyncButton
                            className="action"
                            data-cy="save"
                            onClick={async () => {
                                const {
                                    updateEntireSystem: {
                                        system: {
                                            id,
                                        } = {},
                                    } = {},
                                } = await save() || {};

                                if (id) {
                                    history.push(`${
                                        path.replace(/info/, 'build')
                                        }${
                                        parseSearch(search).update({ systemId: id })
                                        }`);
                                }
                            }}
                            loading={updating}
                        >
                            {systemId === 'null' ? "Save" : "Load"}
                        </AsyncButton>
                    </>
                )}
            />
            <div className="card">
                <Input
                    data-cy="system-name"
                    label="System Name"
                    value={name}
                    onChange={({ target: { value } }) => dispatch(() => ({ name: value }))}
                />
                <Select
                    data-cy="system-type"
                    label="System Type"
                    value={systemType}
                    options={systemTypes}
                    onChange={systemType => dispatch(() => ({ systemType }))}
                />
                <Input
                    data-cy="sightline"
                    label="Sightline"
                    type="inches"
                    initialValue={sightline}
                    onChange={sightline => dispatch(() => ({ sightline }))}
                />
            </div>
        </>
    );
}

export default withRouter(SystemInfo);
