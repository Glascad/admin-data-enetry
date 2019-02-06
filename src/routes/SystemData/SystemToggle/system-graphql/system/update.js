import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateSystem(
        $nodeId:ID!,
        $name:String,
        $systemTypeId:Int,
        $depth:Float,
        $defaultSightline:Float,
        $shimSize:Float,
        $defaultGlassSize:Float,
        $defaultGlassBite:Float
    ){
        updateSystem(input:{
            nodeId:$nodeId,
            systemPatch:{
                name:$name,
                systemTypeId:$systemTypeId,
                depth:$depth,
                defaultSightline:$defaultSightline,
                shimSize:$shimSize,
                defaultGlassSize:$defaultGlassSize,
                defaultGlassBite:$defaultGlassBite
            }
        }){
            system{
                nodeId
                id
                name
                defaultGlassSize
                defaultGlassBite
                depth
                defaultSightline
                shimSize
            }
        }
    }`,
    mapMutationArgumentsToProps: (updatedSystem, {
        system,
        system: {
            _systemType,
        },
        allSystemTypes,
    }) => ({
        system: {
            ...system,
            ...updatedSystem,
            _systemType: allSystemTypes.find(({ id }) => id === updatedSystem.systemTypeId) || _systemType,
        },
    }),
};
