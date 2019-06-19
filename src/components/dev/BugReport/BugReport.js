import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';

import ApolloWrapper from '../../state/ApolloWrapper';
import Input from '../../ui/Input/Input';
import { useMutation } from '../../state/gql-hooks';

import gql from 'graphql-tag';

const mutation = {
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
};

function BugReport({
    state,
    location: {
        pathname,
        search,
    },
    inputClassName = '',
    buttonClassName = '',
    onComplete = () => { },
}) {
    const [report, updateReport] = useState('');
    const [reportBug] = useMutation(mutation);

    return (
        <>
            <Input
                label="Describe The Error"
                className={inputClassName}
                type="textarea"
                maxLength={2500}
                placeholder="Type here..."
                value={report}
                onChange={({ target: { value } }) => updateReport(value)}
            />
            <button
                className={buttonClassName}
                onClick={async () => {
                    const {
                        reportBug: {
                            success,
                        },
                    } = await reportBug({
                        location: `${pathname}${search}`,
                        state: JSON.stringify(state),
                        report,
                    });
                    onComplete(success);
                }}
            >
                Send Report
            </button>
        </>
    )
}

export default withRouter(BugReport);
