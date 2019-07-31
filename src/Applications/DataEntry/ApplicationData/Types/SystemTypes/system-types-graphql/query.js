import gql from 'graphql-tag';
import F from '../../../../../../schema';

export default {
    query: gql`{
        ...PresentationLevels
        allSystemTypes{
            nodes{
                nodeId
                id
                type
                systemTypeDetailTypeConfigurationTypesBySystemTypeId{
                    nodes{
                        nodeId
                        overrideLevel
                        presentationLevel
                        required
                        mirrorable
                        detailTypeId
                        detailTypeByDetailTypeId{
                            nodeId
                            id
                            type
                            entrance
                            vertical
                        }
                        configurationTypeId
                        configurationTypeByConfigurationTypeId{
                            nodeId
                            id
                            type
                            door
                        }
                    }
                }
            }
        }
        allDetailTypes{
            nodes{
                nodeId
                id
                type
                vertical
                entrance
            }
        }
        allConfigurationTypes{
            nodes{
                nodeId
                id
                type
                door
            }
        }
    }
    ${F.CTRLD.PRESENTATION_LEVELS}`,
};
