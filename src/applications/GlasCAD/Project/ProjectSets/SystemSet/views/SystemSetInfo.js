import React from 'react';

import {
    Input,
} from '../../../../../../components';

import { UPDATE_INFILL_SIZE, UPDATE_FILTER, UPDATE_SYSTEM_SET } from '../ducks/actions';

SystemSetInfo.navigationOptions = {
    name: "System Set",
};

export default function SystemSetInfo({
    queryStatus: {
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

    console.log(arguments[0]);

    const creating = !id;

    const manufacturer = creating ?
        allManufacturers.find(({ id }) => id === manufacturerId)
        :
        systemSetManufacturer;

    const manufacturers = creating ?
        allManufacturers
        :
        [manufacturer];

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

    const infillSizes = creating ?
        (system || {})._systemInfillSizes || []
        :
        systemSetSystemInfillSizes;

    const infillSize = creating ?
        infillSizeInput
        :
        systemSetInfillSize;

    const {
        name: manufacturerName,
    } = manufacturer || {};

    const {
        name: systemName,
    } = system || {};

    return (
        <>
            <Input
                label="Manufacturer"
                disabled={!creating}
                select={{
                    value: {
                        value: manufacturerId,
                        label: manufacturerName
                    },
                    options: manufacturers.map(({ id, name }) => ({
                        value: id,
                        label: name,
                    })),
                    onChange: ({ value }) => dispatch(UPDATE_FILTER, { manufacturerId: value }),
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
                    options: systems.map(({ id, name }) => ({
                        value: id,
                        label: name,
                    })),
                    onChange: ({ value }) => dispatch(UPDATE_SYSTEM_SET, { systemId: value }),
                }}
            />
            <Input
                label="Infill Size"
                select={{
                    value: {
                        value: infillSize,
                        label: infillSize,
                    },
                    options: infillSizes.map(({ infillSize }) => ({
                        value: infillSize,
                        label: infillSize,
                    })),
                    onChange: ({ value }) => dispatch(UPDATE_SYSTEM_SET, { infillSize: value }),
                }}
            />
        </>
    );
}
