import React from 'react';

import { Link } from 'react-router-dom';

import {
    CollapsibleTitle,
    ListWrapper,
    Navigator,
} from '../../../../components';

import SystemSet from './SystemSet/SystemSet';

import { parseSearch } from '../../../../utils';

ProjectSetsRouter.navigationOptions = {
    path: "/sets",
};

export default function ProjectSetsRouter(props) {
    return (
        <Navigator
            routes={{
                ProjectSets,
                SystemSet,
            }}
            routeProps={props}
        />
    );
}

ProjectSets.navigationOptions = {
    path: "/all",
};

function ProjectSets({
    queryResult: {
        _project: {
            _systemSets = [],
        } = {},
    },
    history,
    location: {
        search,
    },
    match: {
        path,
    },
}) {
    console.log(arguments[0]);
    return (
        <div className="card">
            <CollapsibleTitle
                titleBar={{
                    title: "System Sets",
                }}
            >
                <ListWrapper
                    identifier="id"
                    items={_systemSets.map(ss => {
                        const {
                            id,
                            name,
                            _system: {
                                name: systemName,
                                _manufacturer: {
                                    name: manufacturerName,
                                },
                            },
                            _elevations: {
                                totalCount,
                            },
                        } = ss;
                        return {
                            ...ss,
                            title: name,
                            subtitle: `${manufacturerName} - ${systemName}`,
                            footer: `Applied to ${totalCount} elevation${totalCount === 1 ? '' : 's'}`,
                            type: 'tile',
                            align: 'left',
                            hoverButtons: [
                                {
                                    children: (
                                        <Link
                                            to={`${path}/system-set${parseSearch(search).update({ systemSetId: id })}`}
                                        >
                                            Edit System
                                        </Link>
                                    ),
                                },
                            ],
                        };
                    })}
                    onDelete={() => { }}
                    circleButton={{
                        type: 'tile',
                        onClick: () => history.push(`${path}/system-set${parseSearch(search).remove('systemSetId')}`),
                    }}
                />
            </CollapsibleTitle>
        </div>
    );
}
