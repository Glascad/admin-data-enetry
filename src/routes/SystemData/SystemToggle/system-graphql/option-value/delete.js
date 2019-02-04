import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteOptionValue(
        $nodeId:ID!
    ){
        deleteOptionValue(
            input:{
                nodeId:$nodeId
            }
        ){
            optionValue{
                nodeId
                id
                name
                value
                systemOptionBySystemOptionId{
                    nodeId
                    systemBySystemId{
                        nodeId
                    }
                }
            }
        }
    }`,
    mapResultToProps: (deletedOptionValue, {
        system,
        system: {
            _systemOptions,
        }
    }) => ({
        system: {
            ...system,
            _systemOptions: _systemOptions
                .map(option => option.id === deletedOptionValue.systemOptionId ?
                    {
                        ...option,
                        _optionValues: {
                            ...option._optionValues,
                            nodes: option._optionValues.nodes.filter(ov => ov.nodeId !== deletedOptionValue.nodeId)
                        }
                    }
                    :
                    option)
        }
    }),
};