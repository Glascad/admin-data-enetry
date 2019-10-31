import React, { Fragment, useState } from 'react';
import {
    Navigator,
    TitleBar,
    Input,
    SVG,
    GroupingBox,
    CircleButton,
    AsyncButton,
    TransformBox,
    TransformProvider,
} from '../../../../components';
import {
    Hamburger,
} from '../../../../assets/icons';
import {
    extractPathData,
    getDroppedFileContents,
    DXFToSVG,
    replace,
} from '../../../../utils';
import './Parts.scss';

export default function Parts({
    _manufacturer: {
        name,
    } = {},
}) {
    // console.log(arguments[0]);
    const [files, setFiles] = useState([]);
    const addFile = file => setFiles(files => files.concat(file));
    const toggleFileSelected = i => setFiles(files => replace(files, i, {
        ...files[i],
        selected: !files[i].selected,
    }));
    const selectionCount = files.reduce((count, { selected }) => count + +selected, 0);
    const fileCount = files.length;


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
                selections={[name]}
                right={(
                    <>
                        {CHECK_BUTTON}
                        {ACTION_BUTTONS}
                    </>
                )}
            />
            <div
                className="card"
                onDragOver={e => e.preventDefault()}
                onDrop={async e => {
                    e.preventDefault();
                    const {
                        dataTransfer: {
                            files,
                        },
                    } = e;
                    const results = await getDroppedFileContents(...files);
                    results.forEach(({
                        file: {
                            name
                        },
                        contents
                    }) => {
                        const data = DXFToSVG(contents);
                        const json = JSON.stringify(data, null, 4);
                        console.log({ name, contents, data, json });
                        addFile({
                            name,
                            contents,
                            data,
                            json,
                            selected: true,
                        });
                    });
                }}
            >
                {files.length ? (
                    <div className="part-box">
                        {files.map(({ name, contents, data, json, selected }, i) => (
                            <div
                                className="part-tile"
                            // onClick={e => {
                            //     e.preventDefault();
                            //     toggleFileSelected(i)
                            // }}
                            >
                                <TitleBar
                                    title={name}
                                    right={(
                                        <Input
                                            Icon={Hamburger}
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
                                            path={data}
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
                    {ACTION_BUTTONS}
                </div>
            </div>
        </>
    );
}
