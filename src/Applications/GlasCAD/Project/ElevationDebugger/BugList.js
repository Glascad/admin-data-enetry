import React from 'react';
import { ListWrapper, TitleBar } from '../../../../components';
import ElevationPreview from '../Elevations/ElevationPreview/ElevationPreview';
import { parseSearch } from '../../../../utils';

export default function BugList({
    history,
    location: {
        search,
    },
    match: {
        path,
    },
    bugReports,
}) {
    console.log({ bugReports });
    return (
        <div className="card">
            <TitleBar
                title="Bug List"
            />
            <ListWrapper
                identifier="id"
                items={bugReports}
                defaultPillProps={{
                    type: "tile",
                    align: "left",
                }}
                mapPillProps={({
                    id,
                    username,
                    report,
                    state,
                    timestamp,
                    location,
                }) => {
                    const parsedState = JSON.parse(state);
                    const lastState = parsedState[parsedState.length - 1];
                    const {
                        rawElevation: {
                            preview
                        }
                    } = lastState;
                    console.log({
                        parsedState,
                        lastState,
                        preview,
                    });
                    return {
                        title: `User: ${username}`,
                        subtitle: report,
                        children: <ElevationPreview preview={preview} />,
                        footer: timestamp,
                        onSelect: () => history.push(`${
                            path.replace(/bug-list/, 'elevation-viewer')
                            }${
                            parseSearch(search).update({ bugId: id })
                            }`),
                    };
                }}
            />
        </div>
    );
}
