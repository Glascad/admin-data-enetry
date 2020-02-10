import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';
import { ListWrapper, TitleBar, useApolloMutation, useApolloQuery } from '../../../../components';
import F from '../../../../schemas';
import { createProjectMutation, deleteProjectMutation } from './mutations';
import query from "./query";

export default function ManageProjects({
    match: {
        path,
    },
}) {
    // console.log(arguments[0]);
    const allProjectsQuery = gql`{ ...AllProjects } ${F.PROJ.ALL_PROJECTS}`;
    const { allProjects = [], __raw: { refetch: fetchQuery } } = useApolloQuery(allProjectsQuery);
    const [deleteProject, { __raw: { loading: deleting } }] = useApolloMutation(deleteProjectMutation, {
        awaitRefetchQueries: true,
        refetchQueries: [{ query }],
    });
    const [createProject, createResult] = useApolloMutation(createProjectMutation, {
        awaitRefetchQueries: true,
        refetchQueries: [{ query }],
    });

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
                    dataCy: name,
                    title: name,
                    hoverButtons: [
                        {
                            children: (
                                <Link
                                    data-cy={`edit-${name}`}
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