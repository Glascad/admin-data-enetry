import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TitleBar, ConfirmButton, AsyncButton, Ellipsis } from '../../../../../../components';
import { parseSearch } from '../../../../../../utils';
import { getDetailTypeFromPath, getConfigurationTypeFromPath } from '../../../../../../app-logic/system-utils';

export default withRouter(function Header({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    history,
    system: {
        name: sName,
        _manufacturer: {
            name: mName,
        } = {},
    },
}) {
    const { path = '' } = parseSearch(search);
    const detailType = getDetailTypeFromPath(path);
    const configurationType = getConfigurationTypeFromPath(path);
    return (
        <TitleBar
            title={mName}
            selections={[sName, detailType, configurationType]}
            className="blue-border"
            left={(
                <ConfirmButton
                    onClick={() => history.push(`${matchPath.replace(/detail/, 'build')}${search}`)}
                    doNotConfirmWhen={true}
                >
                    System
                </ConfirmButton>
            )}
            right={(
                <>
                    <ConfirmButton>
                        Cancel
                    </ConfirmButton>
                    <AsyncButton
                        className="action"
                    >
                        Save And Exit
                    </AsyncButton>
                    <AsyncButton
                        className="action"
                    >
                        Save
                    </AsyncButton>
                </>
            )}
        />
    );
})
