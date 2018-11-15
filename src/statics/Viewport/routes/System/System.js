import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import SystemInfo from './SystemInfo/SystemInfo';
import SystemDetailTypes from './SystemDetailTypes/SystemDetailTypes';
import SystemCompatibility from './SystemCompatibility/SystemCompatibility';
import SystemOptions from './SystemOptions/SystemOptions';

const GET_SYSTEM = gql`
query System($systemNID: ID!){
  system(nodeId: $systemNID){
    id
    name
    depth
    defaultSightline
    shimSize
    defaultGlassSize
    defaultGlassBite
    manufacturerByManufacturerId{
      nodeId
      id
      name
    }
    systemTypeBySystemTypeId{
      nodeId
      id
      type
      systemTypeDetailTypesBySystemTypeId{
        nodes{
          nodeId
        	detailTypeByDetailTypeId{
            nodeId
            id
            type
            entrance
            vertical
            systemTypeDetailTypeConfigurationTypesByDetailTypeId{
              nodes{
                nodeId
                required
                mirrorable
                configurationTypeByConfigurationTypeId{
                  nodeId
                  type
                  door
                  presentationLevel
                  overrideLevel
                }
              }
            }
          }
        }
      }
    }
    invalidSystemConfigurationTypesBySystemId{
      nodes{
        nodeId
        invalidConfigurationTypeId
      }
    }
    systemConfigurationOverridesBySystemId{
      nodes{
        nodeId
        requiredOverride
        mirrorableOverride
        detailTypeId
        configurationTypeId
      }
    }
    systemSystemTagsBySystemId{
      nodes{
        nodeId
        systemTagBySystemTagId{
          nodeId
          id
          type
        }
      }
    }
    systemInfillSizesBySystemId{
      nodes{
        nodeId
        infillSize
      }
    }
    systemInfillPocketTypesBySystemId{
      nodes{
        nodeId
        infillPocketTypeByInfillPocketTypeId{
          nodeId
          id
          type
          captured
          description
        }
      }
    }
    systemInfillPocketSizesBySystemId{
      nodes{
        nodeId
        infillPocketSize
      }
    }
    systemOptionsBySystemId{
      nodes{
        nodeId
        id
        name
        mirrorable
        presentationLevel
        overrideLevel
        optionOrder
        optionValuesBySystemOptionId{
          nodes{
            nodeId
            id
            name
            value
            valueOrder
          }
        }
        systemOptionConfigurationTypesBySystemOptionId{
          nodes{
            nodeId
            configurationTypeByConfigurationTypeId{
              nodeId
              id
              type
            }
          }
        }
      }
    }
  }
}
`;

class System extends Component {

    render() {
        const {
            props: {
                match: {
                    params: {
                        mnfgNID,
                        systemNID,
                    },
                }
            }
        } = this;

        return (
            <Query
                query={GET_SYSTEM}
                variables={{ systemNID }}
            >
                {({
                    loading,
                    error,
                    data,
                    data: {
                        system: {
                            nodeId,
                            id,
                            name,
                            depth,
                            defaultSightline,
                            shimSize,
                            defaultGlassSize,
                            defaultGlassBite,
                            manufacturerByManufacturerId: manufacturer,
                            systemTypeBySystemTypeId: systemType,
                            systemTagsBySystemId: systemTags,
                            invalidSystemConfigurationTypesBySystemId: invalidConfigurationTypes,
                            systemConfigurationOverridesBySystemId: configurationOverrides,
                            systemInfillSizesBySystemId: infillSizes,
                            systemInfillPocketTypesBySystemId: infillPocketTypes,
                            systemInfillPocketSizesBySystemId: infillPocketSizes,
                            systemOptionsBySystemId: options,
                        } = {}
                    }
                }) => (
                        <div id="System">
                            {console.log(data)}
                            <SystemInfo
                                {...{
                                    nodeId,
                                    id,
                                    name,
                                    depth,
                                    defaultSightline,
                                    shimSize,
                                    defaultGlassSize,
                                    defaultGlassBite,
                                    manufacturer,
                                    systemType,
                                    systemTags,
                                    infillSizes,
                                    infillPocketTypes,
                                    infillPocketSizes,
                                }}
                            />
                            <SystemDetailTypes
                                {...{
                                    systemType,
                                    invalidConfigurationTypes,
                                    configurationOverrides,
                                }}
                            />
                            <SystemCompatibility
                                {...{

                                }}
                            />
                            <SystemOptions
                                {...{
                                    options
                                }}
                            />
                        </div>
                    )}
            </Query>
        );
    }
}

export default System;
