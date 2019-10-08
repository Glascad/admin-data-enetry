import React from 'react';
import gql from 'graphql-tag';
import F from '../../../../../schemas';
import {
    useQuery,
    TitleBar,
    requireQueryParams,
} from '../../../../../components';

const query = gql`query SystemSet($systemSetId: Int!) {
    systemSetById(id: $systemSetId) {
        ...EntireSystemSet
    }
    ...ValidOptions
}
${F.PRJ.ENTIRE_SYSTEM_SET}
${F.CTRLD.VALID_OPTIONS}
`;

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
                _system: {
                    name: systemName,
                    _systemOptionValues = [],
                    _detailOptionValues = [],
                    _configurationOptionValues = [],
                } = {},
                allSystems = [],
            } = {},
        } = queryResult;

        return (
            <>
                <TitleBar
                    title="System Set"
                    selections={name ? [name] : undefined}
                />
                <div className="card">

                </div>
            </>
        );
    }
    );




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
