import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';

import ApolloWrapper from '../../state/ApolloWrapper';
import Input from '../../ui/Input/Input';

import gql from 'graphql-tag';

function BugReport({
    state,
    location: {
        href,
    },
    inputClassName = '',
    buttonClassName = '',
    onComplete = () => { },
}) {
    const [report, updateReport] = useState('');
    return (
        <ApolloWrapper
            mutations={{
                reportBug: {
                    mutation: gql`
                        mutation ReportBug(
                            $location: String,
                            $report: String!,
                            $state: JSON
                        ) {
                            reportBug(
                                input: {
                                    location: $location
                                    report: $report
                                    state: $state
                                }
                            ) {
                                success: boolean
                            }
                        }
                    `,
                }
            }}
        >
            {({
                mutations: {
                    reportBug,
                },
            }) => (
                    <>
                        <Input
                            className={inputClassName}
                            label="Report Bug"
                            value={report}
                            onChange={({ target: { value } }) => updateReport(value)}
                        />
                        <button
                            className={buttonClassName}
                            onClick={async () => {
                                const {
                                    data: {
                                        reportBug: {
                                            success,
                                        },
                                    },
                                } = await reportBug({
                                    location: href,
                                    state: JSON.stringify(state),
                                    report,
                                });
                                onComplete(success);
                            }}
                        >
                            Report
                        </button>
                    </>
                )}
        </ApolloWrapper>
    )
}

export default withRouter(BugReport);
