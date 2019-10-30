import React from 'react';
import F from '../../../../schemas';

import {
    Link,
} from 'react-router-dom';

import {
    ApolloWrapper,
    TitleBar,
    ListWrapper,
    useMutation,
    useQuery,
} from '../../../../components';

import query from './query';
import { deleteProjectMutation, createProjectMutation } from './mutations';
import gql from 'graphql-tag';

export default function ManageProjects({
    match: {
        path,
    },
}) {
    // console.log(arguments[0]);
    const allProjectsQuery = { query: gql`{ ...AllProjects } ${F.PRJ.ALL_PROJECTS}` };
    const [fetchQuery, { allProjects = [] }, loading] = useQuery(allProjectsQuery);
    const [deleteProject, deleteResult, deleting] = useMutation(deleteProjectMutation, fetchQuery);
    const [createProject, createResult, creating] = useMutation(createProjectMutation, fetchQuery);

    return (
        <div
            className="card"
            id="ManageProjects"
        >
            <TitleBar
                title="Manage Projects"
            />
            <ListWrapper
                identifier="id"
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
                            ),
                        },
                    ],
                })}
                onCreate={(_, { input }) => createProject({
                    name: input,
                })}
                onDelete={({ arguments: { id } }) => deleteProject({
                    projectId: id,
                })}
                deleteModal={{
                    name: "Project",
                    finishing: deleting,
                }}
                circleButton={{
                    type: "tile",
                }}
            />
        </div>
    );
}