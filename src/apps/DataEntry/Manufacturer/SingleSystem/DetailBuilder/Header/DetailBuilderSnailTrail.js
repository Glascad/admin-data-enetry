import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TitleBar, ConfirmButton, AsyncButton, Ellipsis, SnailTrail, Select } from '../../../../../../components';
import { parseSearch, normalCase } from '../../../../../../utils';
import { getDetailTypeFromPath, getConfigurationTypeFromPath, getOptionListFromPath, getLastItemFromPath, getChildren, getDefaultPath } from '../../../../../../app-logic/system-utils';

const renderOptionSelect = ({
    name,
    value,
    path,
}, {
    system,
    history,
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
}) => {
    const regex = new RegExp(`(${name})\\.(${value}).*`);
    const optionPath = path.replace(regex, name);
    const values = getChildren({ path: optionPath }, system);
    return (
        <Select
            noPlaceholder={true}
            label={name}
            value={value}
            options={values.map(({ path }) => getLastItemFromPath(path))}
            onChange={value => {
                const defaultPath = getDefaultPath(
                    path.replace(regex, `$1.${value}`),
                    system,
                    getOptionListFromPath(path, system).map(({ name, value }) => ({
                        optionName: name,
                        name: value,
                    })),
                );
                const to = `${
                    matchPath
                    }${
                    parseSearch(search).update({ path: defaultPath })
                    }`;
                history.push(to);
            }}
        />
    );
}

const renderOptionList = (path, props) => getOptionListFromPath(path)
    .reduce((list, { name, value }) => list.concat(value ?
        renderOptionSelect({
            name,
            value,
            path
        }, props) :
        name
    ), []);

export default withRouter(function DetailBuilderSnailTrail({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    history,
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
                // ...renderOptionList(path.replace(/\.__DT__.*/, ''), system, history),
                ...getOptionListFromPath(path.replace(/\.__DT__.*/, '')).
                    reduce((list, { name, value }) => list.concat(`${
                        name
                        }: ${
                        value
                        }`),
                        []),
                // detail
                configurationType ? (
                    <Link
                        to={`${
                            matchPath
                            }${
                            parseSearch(search).update({ path: path.replace(/\.__CT__.*/, '') })
                            }`}
                    >
                        DT: {normalCase(detailType)}
                    </Link>
                ) : (
                        <span className="bold">
                            DT: {normalCase(detailType)}
                        </span>
                    ),
                // detail options
                ...renderOptionList(path.replace(/\.__CT__.*/, ''), arguments[0]),
                ...(configurationType ? [
                    // configuration
                    <span className="bold">
                        CT: {normalCase(configurationType)}
                    </span>,
                    // configuration options
                    ...renderOptionList(path, arguments[0]),
                ] : []),
            ]}
        />
    );
});
