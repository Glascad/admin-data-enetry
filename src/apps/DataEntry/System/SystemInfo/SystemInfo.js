import React from 'react';
import SystemInfoInputs from '../modules/SystemInfoInputs';
import Header from './Header';

SystemInfo.navigationOptions = {
    path: '/info',
};

function SystemInfo({
    queryResult,
    systemInput,
    system,
    fetching,
    updating,
    dispatch,
    save,
}) {
    return (
        <>
            <Header
                {...{
                    systemInput,
                    system,
                    queryResult,
                    fetching,
                    save,
                    updating,
                }}
            />
            <div className="card">
                <SystemInfoInputs
                    {...{
                        system,
                        queryResult,
                        dispatch,
                        doNotRenderManufacturer: true,
                    }}
                />
            </div>
        </>
    );
}

export default SystemInfo;
