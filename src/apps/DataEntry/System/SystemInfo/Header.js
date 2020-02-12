import React from 'react';
import { withRouter, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { AsyncButton, ConfirmButton, Ellipsis, TitleBar } from '../../../../components';
import { parseSearch, removeNullishValues } from '../../../../utils';

function Header({
    system: {
        name,
        _manufacturer: {
            name: mnfgName = "",
        } = {},
    },
    queryResult: {
        allManufacturers = [],
    },
    systemInput,
    save,
    updating,
    fetching,
}) {

    console.log(systemInput);

    const history = useHistory();
    const { path } = useRouteMatch();
    const {
        search,
        state: {
            previousPath = '/data-entry/manufacturer/system-search',
            previousSearch,
        } = {},
    } = removeNullishValues(useLocation());

    const { systemId, manufacturerId } = parseSearch(search);

    const mName = mnfgName || (allManufacturers.find(({ id }) => `${id}` === manufacturerId) || {}).name;

    const hasChanges = (
        systemInput.name
        ||
        systemInput.sightline
        ||
        systemInput.systemType
    );

    return (
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
                        onClick={() => history.push(`${previousPath}${previousSearch || search}`)}
                    >
                        Cancel
                    </ConfirmButton>
                    <AsyncButton
                        className="action"
                        data-cy="save-load"
                        onClick={async () => {
                            const {
                                updateEntireSystem: {
                                    system: {
                                        id = systemId,
                                    } = {},
                                } = {},
                            } = hasChanges ? await save() : {};

                            const newPath = `${
                                path.replace(/info/, 'build')
                                }${
                                parseSearch(search).update({ systemId: id })
                                }`;

                            console.log({ newPath });

                            history.push(newPath);
                        }}
                        loading={updating}
                    >
                        {hasChanges || systemId === 'null' ? "Save" : "Load"}
                    </AsyncButton>
                </>
            )}
        />
    );
}

export default withRouter(Header);