import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TitleBar, ConfirmButton, AsyncButton, Ellipsis, SnailTrail, Select } from '../../../../../../components';
import { parseSearch, normalCase } from '../../../../../../utils';
import { getDetailTypeFromPath, getConfigurationTypeFromPath, getOptionListFromPath, getLastItemFromPath } from '../../../../../../app-logic/system-utils';

const renderOptionSelect = ({
    name,
    value,
    path,
    system,
}) => {
    // const
    return (
        <Select
            value={`${name}: ${value}`}
        />
    );
}

const renderOptionList = (path, system) => getOptionListFromPath(path)
    .reduce((list, { name, value }) => list.concat(value ?
        renderOptionSelect({
            name,
            value,
            path,
            system,
        }) :
        name
    ), []);

export default withRouter(function DetailBuilderSnailTrail({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    system,
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
        <SnailTrail
            trail={[
                // manufacturer
                mName || <Ellipsis />,
                // system
                sName || <Ellipsis />,
                // system options
                ...renderOptionList(path.replace(/\.__DT__.*/, ''), system),
                // detail
                configurationType ? (
                    <Link
                        to={`${matchPath}${parseSearch(search).update({ path: path.replace(/\.__CT__.*/, '') })}`}
                    >
                        {normalCase(detailType)}
                    </Link>
                )
                    :
                    detailType,
                // detail options
                ...renderOptionList(path.replace(/\.__CT__.*/, ''), system),
                // configuration
                configurationType,
                // configuration options
                ...(configurationType ? renderOptionList(path, system) : []),
            ]}
        />
    );
});
