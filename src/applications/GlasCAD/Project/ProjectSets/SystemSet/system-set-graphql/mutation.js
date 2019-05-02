import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateEntireSystemSet($systemSetInput: UpdateEntireSystemSetInput!) {
        updateEntireSystemSet(input: $systemSetInput) {
            systemSetOutput {
                id
                system {
                    id
                    name
                }
                infillSize
                selectedOptionValues {
                    selectedValueId
                    systemOption {
                        id
                        name
                        optionOrder
                        presentationLevel
                        overrideLevel
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
                        }
                    }
                }
            }
        }
    }`,
};
