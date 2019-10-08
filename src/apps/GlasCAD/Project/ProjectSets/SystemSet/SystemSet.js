import React from 'react';
import gql from 'graphql-tag';
import F from '../../../../../schemas';
import {
    useQuery,
    TitleBar,
    requireQueryParams,
    CollapsibleTitle,
    Select,
    GroupingBox,
    Input,
} from '../../../../../components';
import {
    getOptionListFromPath,
    getChildren,
    SystemMap,
    getLastItemFromPath,
    getDetailTypeFromPath,
    getConfigurationTypeFromPath,
} from '../../../../../app-logic/system-utils';

const query = gql`query SystemSet($systemSetId: Int!) {
    systemSetById(id: $systemSetId) {
        ...EntireSystemSet
    }
    # ...ValidOptions
    ...AllSystems
}
${F.PRJ.ENTIRE_SYSTEM_SET}
${F.SYS.ALL_SYSTEMS}
`;
// # ${F.CTRLD.VALID_OPTIONS}

export default requireQueryParams({
    systemSetId: Number,
    projectId: Number,
}, ({ __failed__, path, parsed }) => `${
    path.replace(/system-set.*$/, 'all')
    }${
    parsed.remove(Object.keys(__failed__))
    }`
)(function SystemSet({
    queryParams: {
        systemSetId,
        projectId,
    },
}) {
    console.log(arguments[0]);

    const [fetchQuery, queryResult] = useQuery({ query, variables: { systemSetId } });

    console.log({ queryResult, fetchQuery });

    const {
        _systemSet,
        _systemSet: {
            name,
            _system = {},
            systemOptionValuePath = '',
            _systemSetDetailOptionValues = [],
            _systemSetConfigurationOptionValues = [],
            _system: {
                name: systemName = '',
                systemType = '',
                _manufacturer: {
                    name: manufacturerName = '',
                } = {},
                _systemOptions = [],
                _detailOptions = [],
                _configurationOptions = [],
                _systemConfigurations = [],
            } = {},
        } = {},
        allSystems = [],
    } = queryResult;

    console.log({
        systemOptionValuePath,
        _systemSetDetailOptionValues,
        _systemSetConfigurationOptionValues,
    });

    const systemMap = new SystemMap(_system);

    return (
        <>
            <TitleBar
                title="System Set"
                selections={name ? [name] : undefined}
            />
            <div className="card">
                <CollapsibleTitle
                    title="System Info"
                >
                    {/* SYSTEM INFO */}
                    <Select
                        label="Manufacturer"
                        value={manufacturerName}
                        options={allSystems.map(({ _manufacturer: { name } }) => name)}
                        onChange={() => { }}
                    />
                    <Select
                        label="System Type"
                        value={systemType}
                        options={allSystems.map(({ systemType }) => systemType)}
                        onChange={() => { }}
                    />
                    <Select
                        label="System"
                        value={systemName}
                        options={allSystems.map(({ name }) => name)}
                        onChange={() => { }}
                    />
                </CollapsibleTitle>
                <CollapsibleTitle
                    title="Options"
                >
                    {/* SYSTEM OPTIONS */}
                    {getOptionListFromPath(systemOptionValuePath)
                        .map(({ name, value }) => (
                            <Select
                                label={name}
                                value={value}
                                options={getChildren({
                                    path: systemOptionValuePath
                                        .replace(new RegExp(`${name}\\.${value}.*$`), name)
                                }, systemMap
                                ).map(({ path }) => getLastItemFromPath(path))}
                            />
                        ))}
                </CollapsibleTitle>
                <CollapsibleTitle
                    title="Details"
                >
                    {/* SYSTEM DETAILS */}
                    {_systemSetDetailOptionValues.map(({ detailOptionValuePath }) => (
                        <GroupingBox
                            title={getDetailTypeFromPath(detailOptionValuePath)}
                        >
                            {getOptionListFromPath(detailOptionValuePath)
                                .map(({ name, value }) => (
                                    <Select
                                        label={name}
                                        value={value}
                                        options={getChildren({
                                            path: detailOptionValuePath
                                                .replace(new RegExp(`${name}\\.${value}.*$`), name)
                                        }, systemMap
                                        ).map(({ path }) => getLastItemFromPath(path))}
                                    />
                                ))}
                            {_systemConfigurations
                                .filter(({ path }) => path.startsWith(detailOptionValuePath))
                                .map(({ path }) => _systemSetConfigurationOptionValues
                                    .find(({ configurationOptionValuePath }) => configurationOptionValuePath.startsWith(path))
                                    ||
                                    { path }
                                )
                                .map(({ configurationOptionValuePath, path }) => (
                                    <>
                                        <Input
                                            type="switch"
                                            {...console.log({ configurationOptionValuePath, path })}
                                            label={getConfigurationTypeFromPath(configurationOptionValuePath || path)}
                                            checked={!!configurationOptionValuePath}
                                        />
                                        {configurationOptionValuePath ? (
                                            <div className="nested">
                                                {getOptionListFromPath(configurationOptionValuePath)
                                                    .map(({ name, value }) => (
                                                        <Select
                                                            label={name}
                                                            value={value}
                                                            options={getChildren({
                                                                path: configurationOptionValuePath
                                                                    .replace(new RegExp(`${name}\\.${value}.*$`), name),
                                                            }, systemMap
                                                            ).map(({ path }) => getLastItemFromPath(path))}
                                                        />
                                                    ))}
                                            </div>
                                        ) : null}
                                    </>
                                ))}
                        </GroupingBox>
                    ))}

                </CollapsibleTitle>
                {/* <CollapsibleTitle
                    title="Configurations"
                > */}
                {/* SYSTEM CONFIGURATIONS */}

                {/* </CollapsibleTitle> */}
            </div>
        </>
    );
});




// import React, { } from 'react';
// import { TitleBar, useQuery, Select, Input, CollapsibleTitle, GroupingBox, Toggle } from '../../../../../components';
// import gql from 'graphql-tag';
// import { parseSearch } from '../../../../../utils';
// import { getParentTrail, getParent, getChildren } from '../../../../../app-logic/system-utils';

// export default function SystemSets({
//     location: {
//         search,
//     },
// }) {

//     const systemOptionValue = _systemOptionValues.find(({ id }) => id === systemOptionValueId);

//     console.log({ systemOptionValue });

//     const parentTrail = getParentTrail(systemOptionValue, _system);

//     console.log({ parentTrail });

//     const details = getChildren(systemOptionValue, _system);

//     return (
//         <>
//             <TitleBar
//                 title="System Set"
//                 selections={[name]}
//             />
//             <div className="card">
//                 <CollapsibleTitle
//                     title="System Info"
//                 >
//                     <Select
//                         data-cy="system-name"
//                         label="System Name"
//                         value={systemName}
//                         options={allSystems.map(({ name }) => name)}
//                         onChange={() => { }}
//                     />
//                     <Input
//                         data-cy="system-set-name"
//                         label="Set Name"
//                         value={name}
//                         onChange={() => { }}
//                     />
//                 </CollapsibleTitle>
//                 <CollapsibleTitle
//                     title="Options"
//                 >
//                     {parentTrail.map((sov, i) => {
//                         const parent = getParent(sov, _system);
//                         const siblings = getChildren(parent, _system);
//                         return (
//                             <Select
//                                 key={sov.name}
//                                 data-cy={`system-option-${i + 1}`}
//                                 label={parent.name}
//                                 value={sov.name}
//                                 options={siblings.map(({ name }) => name)}
//                             />
//                         );
//                     })}
//                 </CollapsibleTitle>
//                 <CollapsibleTitle
//                     title="Details"
//                 >
//                     {/* <div className="input-group"> */}
//                     {details.map(({ detailType }) => (
//                         <GroupingBox
//                             title={detailType}
//                         >
//                             <Input
//                                 type="switch"
//                                 checked={true}
//                                 onChange={() => { }}
//                                 label="Compensating Receptor"
//                             />
//                             <ul className="nested">
//                                 <Select
//                                     label="Durability"
//                                     value="Standard"
//                                     options={["Standard", "High Performance"]}
//                                 />
//                                 <Select
//                                     label="Option"
//                                     value="Value"
//                                     options={["Value 1", "Value 2"]}
//                                 />
//                                 <Select
//                                     label="Other Option"
//                                     value="Value"
//                                     options={["Value 1", "Value 2"]}
//                                 />
//                             </ul>
//                             <Input
//                                 type="switch"
//                                 checked={false}
//                                 onChange={() => { }}
//                                 label="Compensating Receptor"
//                             />
//                             <Input
//                                 type="switch"
//                                 checked={true}
//                                 onChange={() => { }}
//                                 label="Compensating Receptor"
//                             />
//                             <ul className="nested">
//                                 <Select
//                                     label="Durability"
//                                     value="Standard"
//                                     options={["Standard", "High Performance"]}
//                                 />
//                                 <Select
//                                     label="Option"
//                                     value="Value"
//                                     options={["Value 1", "Value 2"]}
//                                 />
//                                 <div className="input-group">
//                                     <Toggle
//                                         label="Other Option"
//                                         buttons={[
//                                             {
//                                                 text: "Value 1",
//                                                 selected: true,
//                                                 onClick: () => { },
//                                             },
//                                             {
//                                                 text: "Value 2",
//                                                 selected: false,
//                                                 onClick: () => { },
//                                             },
//                                         ]}
//                                     />
//                                 </div>
//                             </ul>
//                         </GroupingBox>
//                     ))}
//                     {/* </div> */}
//                 </CollapsibleTitle>
//             </div>
//         </>
//     );
// }
