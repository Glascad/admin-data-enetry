import gql from 'graphql-tag';

import { recursiveQuery } from '../../../utils';

// CAN ONLY GO SIX LEVELS DEEP. MUST UPDATE WHEN MORE LEVELS NECESSARY

export default gql`${recursiveQuery`{
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
                    horizontal
                    containerByHorizontalAndContainerId{
                        nodeId
                        id
                        size
                        infill
                        horizontal
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
                                ${5}
                            }
                        }
                        ${"end"}
                    }
                }
            }
        }
    }
}`}`;
