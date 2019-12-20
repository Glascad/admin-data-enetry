import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Check } from '../../../../assets/icons';
import { AsyncButton, CircleButton, ConfirmButton, Input, SVG, TitleBar, TransformBox, TransformProvider, useMutation } from '../../../../components';
import F from '../../../../schemas';
import { DXFToSVG, getDroppedFileContents, replace } from '../../../../utils';

const mutation = gql`
    mutation CreatePart($part: PartInput!) {
        createPart(input: {
            part: $part
        }) {
            part {
                ...PartFields
            }
        }
    }
    ${F.MNFG.PART_FIELDS}
`;

ImportParts.navigationOptions = {
    path: "/import",
};

export default function ImportParts({
    location: {
        state,
        search,
    },
    match: {
        path,
    },
    history,
    _manufacturer: {
        id,
        name,
    } = {},
}) {
    console.log(arguments[0]);

    const [files, setFiles] = useState([]);
    const addFile = file => setFiles(files => files.concat(file));

    const toggleFileSelected = i => setFiles(files => replace(files, i, {
        ...files[i],
        selected: !files[i].selected,
    }));

    // const updatePartNumber = (i, partNumber) => setFiles(files => replace(files, i, {
    //     ...files[i],
    //     partNumber,
    // }));

    const handleFileDrop = async e => {
        if (e.preventDefault) e.preventDefault();
        const {
            dataTransfer: {
                files,
            },
        } = e;
        const results = await getDroppedFileContents(...files);
        results.forEach(({
            file: {
                name,
            },
            contents
        }) => {
            const data = DXFToSVG(contents);
            console.log({ name, contents, data });
            addFile({
                partNumber: name.replace(/\.dxf$/, ''),
                contents,
                data,
                selected: true,
            });
        });
    }

    // for linking from parts page
    useEffect(() => {
        if (
            state
            &&
            state.dataTransfer
            &&
            state.dataTransfer.files
        ) handleFileDrop(state);
    }, [state]);

    const selectionCount = files.reduce((count, { selected }) => count + +selected, 0);
    const fileCount = files.length;


    const [savePart, savePartResult, saving] = useMutation({ mutation });

    const rejectParts = () => setFiles(files => files.filter(({ selected }) => !selected));
    const acceptParts = async () => {
        try {
            await Promise.all(files.map(({
                selected,
                partNumber,
                data,
            }) => selected && savePart({
                part: {
                    manufacturerId: id,
                    partNumber,
                    paths: data.map(({ commands }) => ({
                        commands: commands.map(({ command, arguments: args }) => ({
                            command,
                            arguments: args,
                        })),
                    })),
                },
            })));
            history.push(`${path.replace(/import/, 'all')}${search}`, { refetch: true });
        } catch (err) {
            console.error(err);
        }
    }

    const CANCEL_BUTTON = (
        <ConfirmButton
            doNotConfirmWhen={!fileCount}
            onClick={() => history.push(`${path.replace(/import/, 'all')}${search}`)}
            modalProps={{
                titleBar: {
                    title: "Cancel Import",
                },
                children: "Are you sure you want to discard these parts?",
                finishButtonText: "Close",
                danger: true,
            }}
        >
            Close
        </ConfirmButton>
    );

    const CHECK_BUTTON = fileCount ?
        selectionCount === fileCount ? (
            <button
                onClick={() => files.forEach(({ selected }, i) => selected && toggleFileSelected(i))}
            >
                Uncheck All
            </button>
        ) : (
                <button
                    onClick={() => files.forEach(({ selected }, i) => !selected && toggleFileSelected(i))}
                >
                    Check All
                </button>
            ) : null;

    const ACTION_BUTTONS = fileCount ? (
        <>
            <AsyncButton
                className={`danger ${selectionCount ? '' : 'disabled'}`}
                onClick={rejectParts}
            >
                Reject {selectionCount ?
                    selectionCount === fileCount ?
                        'All'
                        :
                        `${selectionCount}/${fileCount}`
                    :
                    ''}
            </AsyncButton>
            <AsyncButton
                className={`action ${selectionCount ? '' : 'disabled'}`}
                onClick={acceptParts}
            >
                Accept {selectionCount ?
                    selectionCount === fileCount ?
                        'All'
                        :
                        `${selectionCount}/${fileCount}`
                    :
                    ''}
            </AsyncButton>
        </>
    ) : null;

    return (
        <>
            <TitleBar
                title="Import Parts"
                snailTrail={[name]}
                left={CANCEL_BUTTON}
                right={(
                    <>
                        {CHECK_BUTTON}
                        {ACTION_BUTTONS}
                    </>
                )}
            />
            <div
                id="ImportParts"
                className="card"
                onDragOver={e => e.preventDefault()}
                onDrop={handleFileDrop}
            >
                {files.length ? (
                    <div className="part-box">
                        {files.map(({ partNumber, contents, data, selected }, i) => (
                            <div className="part-tile">
                                <TitleBar
                                    title={partNumber}
                                    // onEdit={({ target: { value } }) => updatePartNumber(i, value)}
                                    right={(
                                        <Input
                                            Icon={Check}
                                            checked={selected}
                                            onChange={() => toggleFileSelected(i)}
                                        />
                                    )}
                                />
                                <TransformProvider>
                                    <TransformBox
                                        overtakeViewport={false}
                                    >
                                        <SVG
                                            className="part-preview"
                                            paths={data}
                                        />
                                    </TransformBox>
                                </TransformProvider>
                            </div>
                        ))}
                    </div>
                ) : (
                        <CircleButton
                            onDragOver={e => e.preventDefault()}
                            type="tile"
                            renderTextInsteadOfButton="Drag and drop .dxf files anywhere on the card"
                        />
                    )}
                <div className="bottom-buttons">
                    {fileCount ? CANCEL_BUTTON : null}
                    <div className="buttons-right">
                        {ACTION_BUTTONS}
                    </div>
                </div>
            </div>
        </>
    );
}
