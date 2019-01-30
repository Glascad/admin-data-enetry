import gql from 'graphql-tag';

import { recursiveQuery } from '../../../utils';

const query = recursiveQuery`{
    allElevations{
        nodes{
            nodeId
            id
            name
            horizontalRoughOpening
            verticalRoughOpening
            elevationContainersByElevationId{
                nodes{
                    nodeId
                    containerByContainerId{
                        nodeId
                        id
                        size
                        leftFrameId
                        rightFrameId
                        topFrameId
                        bottomFrameId
                        ${"start"}
                        containersByParentContainerId{
                            nodes{
                                nodeId
                                id
                                size
                                leftFrameId
                                rightFrameId
                                topFrameId
                                bottomFrameId
                                ${10}
                            }
                        }
                        ${"end"}
                    }
                }
            }
        }
    }
}`;

export default gql([query]);
