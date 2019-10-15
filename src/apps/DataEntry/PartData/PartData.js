import React, { Fragment, useState } from 'react';

import {
    Navigator,
    TitleBar,
    Input,
} from '../../../components';

function _PartData() {
    const [file, setFile] = useState("");
    return (
        <>
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
                        const reader = new FileReader();
                        reader.onload = ({ target: { result } }) => setFile(`${result}`);
                        reader.readAsText(file);
                    });
                }}
            />
            {file ? (
                <>
                    <TitleBar
                        title="Contents"
                    />
                    <pre>
                        <code>
                            {file}
                        </code>
                    </pre>
                    <TitleBar
                        title="Stripped Contents"
                    />
                </>
            ) : null}
        </>
    );
}

const subroutes = {
    _PartData,
};

PartData.navigationOptions = {
    subroutes,
};

export default function PartData() {
    return (
        <>
            <TitleBar
                title="Part Data"
            />
            <div className="card">
                <Navigator
                    routes={subroutes}
                />
            </div>
        </>
    );
}
