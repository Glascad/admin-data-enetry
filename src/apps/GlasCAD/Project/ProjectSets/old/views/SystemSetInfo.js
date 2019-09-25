import React from 'react';

import {
    Input, Select,
} from '../../../../../../components';

import { UPDATE_INFILL_SIZE, UPDATE_FILTER, UPDATE_SYSTEM_SET } from '../ducks/actions';

SystemSetInfo.navigationOptions = {
    path: "/info",
    name: "System Set",
};

export default function SystemSetInfo({
    queryResult: {
        systemSet: {
            id,
            infillSize: systemSetInfillSize,
            system: systemSetSystem,
            system: {
                infillSizes: systemSetSystemInfillSizes,
                manufacturer: systemSetManufacturer,
            } = {},
        } = {},
        allManufacturers = [],
        allSystems = [],
    },
    systemSetInput: {
        systemId,
        infillSize: infillSizeInput,
    },
    filters: {
        manufacturerId,
        systemTypeId,
    },

    dispatch,
}) {

    const creating = !id;

    const systems = creating ?
        manufacturerId ?
            allSystems.filter(({ manufacturerId: id }) => id === manufacturerId)
            :
            allSystems
        :
        [systemSetSystem];

    const system = creating ?
        systems.find(({ id }) => id === systemId)
        :
        systemSetSystem;

    const manufacturer = creating ?
        allManufacturers.find(({ id }) => id === manufacturerId || (system || {}).manufacturerId)
        :
        systemSetManufacturer;

    const manufacturers = creating ?
        allManufacturers
        :
        [manufacturer];

    const infillSizes = creating ?
        (system || {})._systemInfillSizes || []
        :
        systemSetSystemInfillSizes.map(infillSize => ({ infillSize }));

    const infillSize = infillSizeInput || systemSetInfillSize;

    const {
        name: manufacturerName,
    } = manufacturer || {};

    const {
        name: systemName,
    } = system || {};

    return (
        <>
            <Select
                label="Manufacturer"
                disabled={!creating}
                value={manufacturerName}
                options={manufacturers.map(({ name }) => name)}
                onChange={name => dispatch(UPDATE_FILTER, { manufacturerId: name })}
            />
            <Select
                label="System"
                disabled={!creating}
                value={systemName}
                options={systems.map(({ name }) => name)}
                onChange={value => dispatch(UPDATE_SYSTEM_SET, { systemId: value })}
            />
            <Select
                label="Infill Size"
                value={infillSize}
                options={infillSizes.map(({ infillSize }) => infillSize)}
                onChange={value => dispatch(UPDATE_SYSTEM_SET, { infillSize: value })}
            />
        </>
    );
}
