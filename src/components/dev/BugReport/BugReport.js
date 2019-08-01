import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';

import ApolloWrapper from '../../state/ApolloWrapper';
import Input from '../../ui/Input/Input';
import { useMutation } from '../../hooks/use-graphql';

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
    smallerState,
    smallestState,
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

    const sendReport = async (tryCount = 1) => {
        if (tryCount > 3) return;
        else {
            const payload = JSON.stringify(tryCount === 1 ?
                state
                :
                tryCount === 2 ?
                    smallerState
                    :
                    smallestState
            );
            if (payload) {
                try {
                    const {
                        reportBug: {
                            success,
                        },
                    } = await reportBug({
                        location: `${pathname}${search}`,
                        state: payload,
                        report,
                    });
                    onComplete(success);
                } catch (err) {
                    console.log({ err });
                    console.log({ ...err });

                    const {
                        networkError: {
                            statusCode,
                        } = {},
                    } = err || {};
                    if (statusCode === 413) {
                        sendReport(tryCount + 1);
                    }
                }
            }
        }
    }

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
                onClick={() => sendReport()}
            >
                Send Report
            </button>
        </>
    )
}

export default withRouter(BugReport);
