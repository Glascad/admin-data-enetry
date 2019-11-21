import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { getChildren, getConfigurationTypeFromPath, getDefaultPath, getDetailTypeFromPath, getLastItemFromPath, getOptionListFromPath } from '../../../../../../app-logic/system-utils';
import { Ellipsis, Select, SnailTrail } from '../../../../../../components';
import { parseSearch } from '../../../../../../utils';

const OptionSelect = ({
    className = '',
    name,
    value,
    path,
    systemMap,
    history,
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
}) => {
    const { path: searchPath } = parseSearch(search);
    const regex = new RegExp(`(${name})\\.(${value}).*`);
    const optionPath = path.replace(regex, name);
    const values = getChildren({ path: optionPath }, systemMap);
    // console.log({ searchPath, regex, optionPath, values, name, value });
    return (
        <Select
            data-cy={`snail-trail-select-${name}`}
            className={`${
                className
                }${
                value ? '' : 'empty'
                }`}
            noPlaceholder={true}
            autoResize={true}
            label={name}
            value={value || 'None'}
            options={values.map(({ path }) => getLastItemFromPath(path))}
            onChange={value => {
                const defaultPath = getDefaultPath(
                    path.match(regex) ?
                        path.replace(regex, `$1.${value}`)
                        :
                        `${path}.${name}.${value}`,
                    systemMap,
                    getOptionListFromPath(path, systemMap).map(({ name, value }) => ({
                        optionName: name,
                        name: value,
                    })),
                );
                // must have detail
                const pathWithDetail = defaultPath.match(/\.__DT__\./) ?
                    defaultPath
                    :
                    `${defaultPath}.__DT__.${getDetailTypeFromPath(searchPath)}`;

                // console.log({ defaultPath, path, name, value });

                if (systemMap[pathWithDetail]) {
                    const to = `${
                        matchPath
                        }${
                        parseSearch(search).update({ path: pathWithDetail })
                        }`;
                    history.push(to);
                }
            }}
        />
    );
}

const renderOptionList = (path, props) => getOptionListFromPath(path)
    .reduce((list, { name, value }) => list.concat(
        <OptionSelect
            {...{
                name,
                value,
                path,
                ...props,
            }}
        />
    ), []);

export default withRouter(memo(function DetailBuilderSnailTrail({
    location: {
        search,
    },
    match: {
        path: matchPath,
    },
    history,
    systemMap,
    systemMap: {
        name: sName,
        _manufacturer: {
            name: mName,
        } = {},
    },
}) {
    const props = arguments[0];
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
                ...renderOptionList(path.replace(/\.__DT__.*/, ''), props),
                // detail
                <OptionSelect
                    {...{
                        className: configurationType ? '' : 'bold',
                        name: '__DT__',
                        value: detailType,
                        path: path.replace(/\.__DT__.*/, ''),
                        ...props,
                    }}
                />,
                // detail options
                ...renderOptionList(path.replace(/\.__CT__.*/, ''), props),
                // configuration
                <OptionSelect
                    {...{
                        className: configurationType ? 'bold' : '',
                        name: '__CT__',
                        value: configurationType,
                        path: path.replace(/\.__CT__.*/, ''),
                        ...props,
                    }}
                />,
                // configuration options
                ...(path.match(/\.__CT__\./) ?
                    renderOptionList(path, props)
                    :
                    []),
            ]}
        />
    );
}));
