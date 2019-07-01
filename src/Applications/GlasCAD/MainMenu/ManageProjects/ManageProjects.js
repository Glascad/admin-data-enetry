import React from 'react';
import F from '../../../../schema';

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
import {deleteProjectMutation, createProjectMutation} from './mutations';
import gql from 'graphql-tag';

export default function ManageProjects({
    match: {
        path,
    },
}) {
    const allProjectsQuery = { query: gql`{ ...AllProjects } ${F.PR_DATA.ALL_PROJECTS}` };
    const [fetchQuery, { allProjects = [] }, loading] = useQuery(allProjectsQuery);
    const [deleteProject, deleteResult, deleting] = useMutation(deleteProjectMutation, fetchQuery);
    const [createProject, createResult, creating] = useMutation(createProjectMutation, fetchQuery);


    return (
        <div className="card">
            {/* {console.log({ allProjects })} */}
            <TitleBar
                title="Manage Projects"
            />
            <ListWrapper
                identifier="id"
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
                onDelete={({ arguments: { id } }) => deleteProject({
                    projectId: id,
                })}
                deleteModal={{
                    name: "Project",
                    finishing: deleting,
                }}
                // onDelete={() => console.log("Cannot delete!")}
                circleButton={{
                    type: "tile",
                }}
            />
        </div>
    )
}