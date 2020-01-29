import React from 'react';
import { ListWrapper, SVG, TitleBar } from '../../../../components';
import { parseSearch } from '../../../../utils';
import ElevationPreview from '../Elevations/ElevationPreview/ElevationPreview';

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
    // console.log({ bugReports });
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
                    // console.log({
                    //     parsedState,
                    //     lastState,
                    //     preview,
                    // });
                    return {
                        title: `User: ${username}`,
                        subtitle: report,
                        children: <ElevationPreview preview={preview} />,
                        footer: timestamp,
                        hoverButtons: [
                            {
                                onClick: () => history.push(`${
                                    path.replace(/-debugger.*/, 's/elevation/build-elevation')
                                    }${
                                    parseSearch(search)
                                        .update({ bugId: id })
                                        .remove("elevationId", "sampleElevation")
                                    }`),
                                text: "Load",
                            },
                            {
                                onClick: () => history.push(`${
                                    path.replace(/bug-list/, 'elevation-viewer')
                                    }${
                                    parseSearch(search).update({ bugId: id })
                                    }`),
                                text: "View"
                            },
                        ]
                    };
                }}
            />
        </div>
    );
}
