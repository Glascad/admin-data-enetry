import React from 'react';
import { StateManager, Input } from '../../../../../../components';

SystemSetInfo.navigationOptions = {
    name: "System Set",
};

export default function SystemSetInfo({
    queryStatus: {
        systemSet: {
            id,
            infillSize,
            system: {
                id: systemId,
                name: systemName,
                manufacturer: {
                    id: manufacturerId,
                    name: manufacturerName,
                } = {},
            } = {},
        } = {},
        allManufacturers = [],
        allManufacturers: [
            {
                id: firstManufacturerId,
                name: firstManufacturerName,
                _systems: firstManufacturerSystems = [],
                _systems: [
                    {
                        id: firstSystemId,
                        name: firstSystemName,
                        _systemInfillSizes: firstSystemInfillSizes = [],
                        _systemInfillSizes: [
                            {
                                infillSize: firstInfillSize,
                            } = {},
                        ] = [],
                    } = {},
                ] = [],
            } = {},
        ] = [],
    },
}) {

    const creating = !id;

    const initialState = creating ?
        {
            manufacturerId: firstManufacturerId,
            manufacturerName: firstManufacturerName,
            manufacturerSystems: firstManufacturerSystems,
            systemId: firstSystemId,
            systemName: firstSystemName,
            systemInfillSizes: firstSystemInfillSizes,
            infillSize: firstInfillSize,
        } : {
            manufacturerId,
            manufacturerName,
            systemId,
            systemName,
            infillSize,
        };

    return (
        <StateManager
            initialState={initialState}
        >
            {({
                state: {
                    manufacturerId,
                    manufacturerName,
                    manufacturerSystems,
                    systemId,
                    systemName,
                    systemInfillSizes,
                    infillSize,
                },
            }) => (
                    <>
                        <Input
                            label="Manufacturer"
                            disabled={!creating}
                            select={{
                                value: {
                                    value: manufacturerId,
                                    label: manufacturerName
                                },
                                options: allManufacturers.map(({ id, name }) => ({
                                    value: id,
                                    label: name,
                                })),
                                onChange: ({ }) => { },
                            }}
                        />
                        <Input
                            label="System"
                            disabled={!creating}
                            select={{
                                value: {
                                    value: systemId,
                                    label: systemName,
                                },
                                options: manufacturerSystems.map(({ id, name }) => ({
                                    value: id,
                                    label: name,
                                })),
                                onChange: ({ }) => { },
                            }}
                        />
                        <Input
                            label="Infill Size"
                            select={{
                                value: {
                                    value: infillSize,
                                    label: infillSize,
                                },
                                options: systemInfillSizes.map(({ infillSize }) => ({
                                    value: infillSize,
                                    label: infillSize,
                                })),
                                onChange: ({ }) => { },
                            }}
                        />
                    </>
                )}
        </StateManager>
    );
}
