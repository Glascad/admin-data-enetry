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
            name: systemName = "",
            _manufacturer: {
                id: manufacturerId,
                name: mnfgName = "",
            } = {},
            systemType,
        } = {},
        allManufacturers,
        allSystemTypes,
    },
    updateEntireSystem,
}) {
    const { systemId } = parseSearch(search);

    return (
        <>
            <TitleBar
                title={systemId ?
                    fetching ?
                        <Ellipsis text="Loading" />
                        :
                        mnfgName
                    :
                    "New System"}
                selections={systemId && !fetching ? [systemName] : []}
                right={(
                    <>
                        <ConfirmButton
                            data-cy="close"
                            doNotConfirmWhen={true}
                            onClick={() => {
                                history.push(`${
                                    path.replace(/system\/info/, 'main-menu/system-search')
                                    }${
                                    search
                                    }`);
                            }}
                        >
                            Close
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
                                // onClick={save}
                                // loading={updating}
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
                />
                <Input
                    data-cy="system-type"
                />
                <Input
                    data-cy="manufacturer"
                />
            </div>
        </>
    );
}

export default withRouter(SystemInfo);
