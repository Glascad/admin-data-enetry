import React from 'react';
import { withRouter } from 'react-router-dom';
import { TitleBar, Ellipsis, ConfirmButton } from '../../../../components';
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
                name: mnfgName = "",
            } = {},
        } = {},
    },
}) {
    const { systemId } = parseSearch(search);

    return (
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
                </>
            )}
        />
    );
}

export default withRouter(SystemInfo);
