import React, { Fragment, useState } from 'react';
import {
    Navigator,
    TitleBar,
    Input,
} from '../../../../components';
import {
    extractPathData,
} from '../../../../utils';

export default function Parts() {
    const [files, setFiles] = useState([]);
    const addFile = file => setFiles(files => files.concat(file));
    return (
        <div className="card">
            <Input
                label="Drop"
                onDrop={e => {
                    const {
                        dataTransfer,
                        dataTransfer: {
                            items,
                            files,
                        }
                    } = e;

                    e.preventDefault();

                    // console.log({ dataTransfer, items, files });

                    [...files].forEach(file => {
                        console.log(files);
                        const { name } = file;
                        const reader = new FileReader();
                        reader.onload = ({ target: { result: contents } }) => {
                            try {
                                addFile({
                                    name,
                                    contents,
                                    pathData: extractPathData(contents),
                                });
                            } catch (err) {
                                addFile({
                                    name,
                                    contents,
                                    error: err.message,
                                });
                            }
                        }
                        reader.readAsText(file);
                    });
                }}
            />
            {files.map(({ name, contents, pathData }) => (
                <>
                    <TitleBar
                        title={name}
                    />
                    <pre>
                        <code>
                            {contents}
                        </code>
                    </pre>
                    <pre>
                        <code>
                            {JSON.stringify(pathData, null, 4)}
                        </code>
                    </pre>
                </>
            ))}
        </div>
    );
}
