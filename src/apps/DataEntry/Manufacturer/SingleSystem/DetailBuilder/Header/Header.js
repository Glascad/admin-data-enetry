import React from 'react';
import { withRouter } from 'react-router-dom';
import { getConfigurationTypeFromPath, getDetailTypeFromPath } from '../../../../../../app-logic/system-utils';
import { AsyncButton, ConfirmButton, TitleBar } from '../../../../../../components';
import { parseSearch } from '../../../../../../utils';
import DetailBuilderSnailTrail from './DetailBuilderSnailTrail';

export default withRouter(function Header({
    location: {
        search,
        state: {
            previousPath,
        } = {},
    },
    match: {
        path: matchPath,
    },
    history,
    systemMap,
}) {
    const { path = '' } = parseSearch(search);
    const detailType = getDetailTypeFromPath(path);
    const configurationType = getConfigurationTypeFromPath(path);
    return (
        <>
            <TitleBar
                title={`${
                    configurationType || detailType
                    } ${
                    configurationType ?
                        'Configuration'
                        :
                        'Detail'
                    }`}
                className="blue-border"
                left={(
                    <ConfirmButton
                        onClick={() => history.push(`${
                            matchPath.replace(/detail/, 'info')
                            }${
                            search
                            }`, {
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
                            onClick={() => history.push(`${
                                matchPath.replace(/detail/, 'build')
                                }${
                                parseSearch(search).update({ path: previousPath || path })
                                }`)}
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
            <DetailBuilderSnailTrail
                systemMap={systemMap}
            />
        </>
    );
});
