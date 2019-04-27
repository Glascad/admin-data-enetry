import gql from 'graphql-tag';

export default gql`query SelectEntireSystemSet($systemSetId: Int!) {
    allManufacturers {
        nodes {
            nodeId
            id
            name
            systemsByManufacturerId {
                nodes {
                    nodeId
                    id
                    name
                    systemInfillSizesBySystemId {
                        nodes {
                            nodeId
                            infillSize
                        }
                    }
                    systemOptionsBySystemId(
                        orderBy: OPTION_ORDER_ASC,
                        condition: {
                            presentationLevel: SYSTEM
                        }
                    ) {
                        nodes {
                            nodeId
                            id
                            name
                            optionOrder
                            optionValuesBySystemOptionId(orderBy: VALUE_ORDER_ASC) {
                                nodes {
                                    nodeId
                                    id
                                    name
                                    value
                                    valueOrder
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    systemSet: selectEntireSystemSet(systemSetId: $systemSetId) {
        id
        infillSize
        system {
            id
            name
            infillSizes
            manufacturer {
                id
                name
            }
            systemType {
                id
                type
            }
        }
        systemOptions {
            selectedValueId
            systemOption {
                id
                name
                optionOrder
                overrideLevel
                presentationLevel
            }
            optionValues {
                id
                name
                value
                valueOrder
            }
        }
        detailTypes {
            detailType {
                id
                type
                entrance
                vertical
            }
            configurationTypes {
                selected
                systemDefault {
                    invalid
                    configurationType {
                        id
                        type
                        door
                        required
                        mirrorable
                        presentationLevel
                        overrideLevel
                    }
                    systemTypeDefault {
                        id
                        type
                        door
                    }
                }
            }
        }
    }
}`;
