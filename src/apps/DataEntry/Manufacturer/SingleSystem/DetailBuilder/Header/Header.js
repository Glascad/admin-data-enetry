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
    save,
}) {
    const { path = '' } = parseSearch(search);
    const detailType = getDetailTypeFromPath(path);
    const configurationType = getConfigurationTypeFromPath(path);
    const close = () => history.push(`${
        matchPath.replace(/detail/, 'build')
        }${
        parseSearch(search).update({ path: previousPath || path })
        }`);
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
                            onClick={close}
                            doNotConfirmWhen={true}
                        >
                            Close
                        </ConfirmButton>
                        <AsyncButton
                            className="action"
                            onClick={async () => {
                                await save();
                                close();
                            }}
                        >
                            Save And Exit
                        </AsyncButton>
                        <AsyncButton
                            className="action"
                            onClick={save}
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
