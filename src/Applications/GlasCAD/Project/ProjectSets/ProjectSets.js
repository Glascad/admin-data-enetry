import React from 'react';

import { Link } from 'react-router-dom';

import {
    CollapsibleTitle,
    ListWrapper,
} from '../../../../components';

import { parseSearch } from '../../../../utils';

export default ({
    queryStatus: {
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
}) => (
        <div className="card">
            <CollapsibleTitle
                titleBar={{
                    title: "System Sets",
                }}
            >
                <ListWrapper
                    items={_systemSets}
                    identifier="id"
                    defaultPillProps={{
                        type: 'tile',
                        align: 'left',
                    }}
                    mapPillProps={({
                        id: systemSetId,
                        _system: {
                            name: systemName = '',
                            _manufacturer: {
                                name: manufacturerName = '',
                            } = {},
                            _elevations: {
                                totalCount = 0,
                            } = {},
                        },
                    }) => ({
                        title: manufacturerName,
                        subtitle: systemName,
                        footer: `Applied to ${totalCount} elevation${totalCount === 1 ? '' : 's'}`,
                        hoverButtons: [
                            {
                                children: (
                                    <Link
                                        to={`${path}/system-set${parseSearch(search).update({ systemSetId })}`}
                                    >
                                        Edit System
                                    </Link>
                                ),
                            },
                        ],
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
