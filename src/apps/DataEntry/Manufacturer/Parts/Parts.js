import React, { Fragment, useState } from 'react';
import {
    Navigator,
    TitleBar,
    Input,
    SVG,
} from '../../../../components';
import {
    extractPathData,
    getDroppedFileContents,
    DXFToSVG,
} from '../../../../utils';
import './Parts.scss';

export default function Parts({
    _manufacturer: {
        name,
    } = {},
}) {
    console.log(arguments[0]);
    const [files, setFiles] = useState([]);
    const addFile = file => setFiles(files => files.concat(file));
    return (
        <div className="card">
            <TitleBar
                title="Manufacturer"
                selections={[name]}
            />
            <Input
                label="Drop"
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
                        });
                    });
                }}
            />
            {files.map(({ name, contents, data, json }) => (
                <>
                    <TitleBar
                        title={name}
                        selections={["Extracted Data"]}
                    />
                    <SVG
                        className="part-preview"
                        path={data}
                    />
                    <pre>
                        <code>
                            {/* {contents.replace(/\n/g, '\\n').replace(/\r/, '\\r')} */}
                            {/* {json} */}
                        </code>
                    </pre>
                    {/* <pre>
                        <code>
                            {JSON.stringify(pathData, null, 4)}
                        </code>
                    </pre> */}
                </>
            ))}
        </div>
    );
}
