export default {
    system_type: {
        id: 1,
        type: "System Type",
        detail_types: [
            {
                id: 1,
                type: "Head",
                vertical: false,
                entrance: false,
                configuration_types: [
                    {
                        id: 1,
                        type: "Head",
                        required: true,
                        mirrorable: true,
                        presentation_level: null,
                        override_level: null,
                    },
                ],
            },
        ],
    },
    system: {
        id: 1,
        name: "System Name",
        depth: 1,
        default_glass_size: 1,
        default_glass_bite: 1,
        default_sightline: 1,
        top_gap: 1,
        bottom_gap: 1,
        side_gap: 1,
        meeting_stile_gap: 1,
        inset: false,
        glass_gap: 1,
        shim_size: 1,
        front_inset: 1,
        manufacturer: {
            id: 1,
            name: "Manufacturer Name",
        },
        system_type: {
            id: 1,
            name: "System Type",
        },
        // DETAIL TYPES,
        detail_types: [
            {
                id: 1,
                type: "Head",
                vertical: false,
                entrance: false,
                // CONFIGURATION TYPES,
                configuration_types: [
                    {
                        id: 1,
                        type: "Head",
                        // INVALID,
                        invalid: false,
                        // POSSIBLY OVERRIDDEN VALUES,
                        required: true,
                        mirrorable: true,
                        presentation_level: null,
                        override_level: null,
                        // SYSTEM_TYPE DEFAULT VALUES,
                        system_type_default: {
                            required: true,
                            mirrorable: true,
                            presentation_level: null,
                            override_level: null,
                        },
                    },
                ],
            },
        ],
    },
    system_set: {
        system: {
            id: 1,
            name: "System Name",
            depth: 1,
            default_glass_size: 1,
            default_glass_bite: 1,
            default_sightline: 1,
            top_gap: 1,
            bottom_gap: 1,
            side_gap: 1,
            meeting_stile_gap: 1,
            inset: false,
            glass_gap: 1,
            shim_size: 1,
            front_inset: 1,
            manufacturer: {
                id: 1,
                name: "Manufacturer Name",
            },
            system_type: {
                id: 1,
                name: "System Type",
            },
        },
        detail_types: [
            {
                id: 1,
                type: "Head",
                vertical: false,
                entrance: false,
                // CONFIGURATION TYPES,
                configuration_types: [
                    {
                        id: 1,
                        type: "Head",
                        // SELECTION
                        selected: true,
                        // INVALID,
                        invalid: false,
                        // POSSIBLY OVERRIDDEN VALUES,
                        required: true,
                        mirrorable: true,
                        presentation_level: null,
                        override_level: null,
                        // SYSTEM DEFAULT
                        system_default: {
                            required: true,
                            mirrorable: true,
                            presentation_level: null,
                            override_level: null,
                        },
                        // SYSTEM_TYPE DEFAULT VALUES,
                        // ? not necessary ?
                        // system_type_default: {
                        //     required: true,
                        //     mirrorable: true,
                        //     presentation_level: null,
                        //     override_level: null,
                        // },
                    },
                ],
            },
        ],
    },
};