import React from 'react';

import {
    Link,
} from 'react-router-dom';

import {
    ApolloWrapper,
    TitleBar,
    ListWrapper,
} from '../../../components';

import query from './query';
import mutations from './mutations';

export default function ManageProjects({
    match: {
        path,
    },
}) {
    return (
        <ApolloWrapper
            query={{ query }}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    allProjects = [],
                },
                mutations: {
                    createProject,
                },
            }) => (
                    <div className="card">
                        <TitleBar
                            title="Manage Projects"
                        />
                        <ListWrapper
                            label="Active Projects"
                            items={allProjects}
                            defaultPillProps={{
                                type: "tile",
                                align: "left",
                            }}
                            mapPillProps={({ id, name }) => ({
                                title: name,
                                hoverButtons: [
                                    {
                                        children: (
                                            <Link
                                                to={path.replace(/main-menu.*/,
                                                    `project/project-details?projectId=${id}`)}
                                            >
                                                Edit project
                                            </Link>
                                        )
                                    },
                                ],
                            })}
                            onCreate={(_, { input }) => createProject({
                                name: input,
                            })}
                            onDelete={() => console.log("Cannot delete!")}
                            circleButton={{
                                type: "tile",
                            }}
                        />
                    </div>
                )}
        </ApolloWrapper>
    )
}