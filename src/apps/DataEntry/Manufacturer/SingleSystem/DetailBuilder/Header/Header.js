import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TitleBar, ConfirmButton, AsyncButton, Ellipsis, SnailTrail } from '../../../../../../components';
import { parseSearch } from '../../../../../../utils';
import { getDetailTypeFromPath, getConfigurationTypeFromPath, getOptionListFromPath } from '../../../../../../app-logic/system-utils';

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
        <>
            <TitleBar
                title={`${detailType} Detail`}
                className="blue-border"
                left={(
                    <ConfirmButton
                        onClick={() => history.push(`${matchPath.replace(/detail/, 'info')}${search}`, {
                            previousPath: matchPath,
                            previousSearch: search,
                        })}
                        doNotConfirmWhen={true}
                    >
                        System Info
                    </ConfirmButton>
                )}
                right={(
                    <>
                        <ConfirmButton
                            onClick={() => history.push(`${matchPath.replace(/detail/, 'build')}${search}`)}
                            doNotConfirmWhen={true}
                        >
                            Close
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
            <SnailTrail
                trail={[
                    mName,
                    sName,
                    ...getOptionListFromPath(path.replace(/\.__DT__.*/, '')).reduce((list, { name, value }) => list.concat(`${name}: ${value}`), []),
                    detailType,
                    ...getOptionListFromPath(path.replace(/\.__CT__.*/, '')).reduce((list, { name, value }) => list.concat(`${name}: ${value}`), []),
                    configurationType,
                    ...(configurationType ?
                        getOptionListFromPath(path).reduce((list, { name, value }) => list.concat(`${name}: ${value}`), [])
                        :
                        []),
                ]}
            />
        </>
    );
})
