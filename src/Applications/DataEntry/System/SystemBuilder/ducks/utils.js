
export const getFirstItem = ({ _systemOptions }) => _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId);

export const getChildren = (item, system) => {
    const {
        __typename,
        id,
    } = item;

    // if (__typename === "SystemOption"){

    // }else if (__typename === "SystemOptionValue"){

    // }else if(__typename === "DetailOptionValue")
};

export const makeRenderable = ({

}) => ({
    item: {},
    branches: [
        {
            item: {},
            branches: [
                {
                    item: {},
                    branches:[],
                },
                {
                    item: {},
                    branches:[],
                },
                {
                    item: {},
                    branches:[],
                },
            ],
        },
        {
            item: {},
            branches: [
                {
                    item: {},
                    branches:[],
                },
                {
                    item: {},
                    branches:[],
                },
                {
                    item: {},
                    branches:[],
                },
            ],
        },
        {
            item: {},
            branches: [
                {
                    item: {},
                    branches:[],
                },
                {
                    item: {},
                    branches:[],
                },
                {
                    item: {},
                    branches:[],
                },
            ],
        },
    ],
});
