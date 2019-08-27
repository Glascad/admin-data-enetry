import React from 'react';
import { TitleBar, Ellipsis } from '../../../../components';
import { parseSearch } from '../../../../utils';

SystemInfo.navigationOptions = {
    path: '/info',
};

export default function SystemInfo({
    fetching,
    queryStatus: {
        _system: {
            name: systemName = "",
            _manufacturer: {
                name: mnfgName = "",
            } = {},
        } = {},
    },
    location: {
        search,
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
        />
    );
}
