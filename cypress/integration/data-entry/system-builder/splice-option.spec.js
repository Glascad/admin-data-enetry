
describe('User can splice an option below all available spots', () => {


    // CHANGES VALUE BY ITEM_NAME

    it('can splice an option under a system', () => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?=&manufacturerId=1&systemId=3`);

        // Clicks the System
        cy.getDataCy`3`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        cy.getDataCy`3.SELECT_OPTION`.should('exist');
        // Options that used to be under STOPS DOWN are now under new value
        cy.getDataCy`3.SELECT_OPTION.EMPTY_VALUE.SET`.should('exist');
        cy.getDataCy`3.SET`.should('not.exist');
        // clicks the newly spliced option
        cy.getDataCy`3.SELECT_OPTION`.click({ force: true });
        // selects a new Option Durability
        cy.getDataCy`edit-option-name`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`3.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`3.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a systemOptionValue', () => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?=&manufacturerId=3&systemId=3`);
        // Clicks the System Option Value
        cy.getDataCy`3.SET.CENTER`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        cy.getDataCy`3.SET.CENTER.SELECT_OPTION`.should('exist');
        // Options that used to be under STOPS DOWN are now under new value
        cy.getDataCy`3.SET.CENTER.SELECT_OPTION.EMPTY_VALUE.JOINERY`.should('exist');
        cy.getDataCy`3.SET.CENTER.JOINERY`.should('not.exist');
        // clicks the newly spliced option
        cy.getDataCy`3.SET.CENTER.SELECT_OPTION`.click({ force: true });
        // selects a new Option Durability
        cy.getDataCy`edit-option-name`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`3.SET.CENTER.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`3.SET.CENTER.DURABILITY.STANDARD_DUTY`.should('exist');

    });

    // CHANGES VALUE BY CHANGING CHILD OPTION NAME

    it('can splice an option under a system', () => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?=&manufacturerId=1&systemId=3`);

        // Clicks the System
        cy.getDataCy`3`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        // types in child selection
        cy.getDataCy`edit-child-select_option select_option`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`3.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`3.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a systemOptionValue', () => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?=&manufacturerId=3&systemId=3`);
        // Clicks the System Option Value
        cy.getDataCy`3.SET.CENTER`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        // types in child selection
        cy.getDataCy`edit-child-select_option select_option`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`3.SET.CENTER.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`3.SET.CENTER.DURABILITY.STANDARD_DUTY`.should('exist');

    });


    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/system/build?sampleSystem=sample3&manufacturerId=1&systemId=1`);
    });;

    it('can splice an option under a systemDetail', () => {
        // Clicks the SystemDetail
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.SELECT_OPTION`.should('exist');
        // Options that used to be under STOPS DOWN are now under new value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.SELECT_OPTION.EMPTY_VALUE.__CT__.HORIZONTAL`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL`.should('not.exist');
        // clicks the newly spliced option
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.SELECT_OPTION`.click({ force: true });
        // selects a new Option Durability
        cy.getDataCy`edit-option-name`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a detailOptionValue', () => {
        // Clicks the Detail Option Value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.SELECT_OPTION`.should('exist');
        // Options that used to be under STOPS DOWN are now under new value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.SELECT_OPTION.EMPTY_VALUE.GLAZING`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.GLAZING`.should('not.exist');
        // clicks the newly spliced option
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.SELECT_OPTION`.click({ force: true });
        // selects a new Option Durability
        cy.getDataCy`edit-option-name`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a detailConfiguration', () => {
        // Clicks the configuration
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.SELECT_OPTION`.should('exist');
        // Options that used to be under STOPS DOWN are now under new value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.SELECT_OPTION.EMPTY_VALUE.STOPS`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS`.should('not.exist');
        // clicks the newly spliced option
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.SELECT_OPTION`.click({ force: true });
        // selects a new Option Durability
        cy.getDataCy`edit-option-name`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.DURABILITY.STANDARD_DUTY`.should('exist');

    });

    it('can splice an option under a configurationOptionValue', () => {

        // Clicks the configuration Option Value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.SELECT_OPTION`.should('exist');
        // Options that used to be under STOPS DOWN are now under new value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.SELECT_OPTION.EMPTY_VALUE.GLAZING`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING`.should('not.exist');
        // clicks the newly spliced option
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.SELECT_OPTION`.click({ force: true });
        // selects a new Option Durability
        cy.getDataCy`edit-option-name`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a value with multiple types under it', () => {
        // Clicks the Detail Option Value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.SELECT_OPTION`.should('exist');
        // Options that used to be under STOPS DOWN are now under new value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.SELECT_OPTION.EMPTY_VALUE.__CT__.SILL`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.SELECT_OPTION.EMPTY_VALUE.__CT__.SHIM_SUPPORT`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.SELECT_OPTION.EMPTY_VALUE.__CT__.SILL_FLASHING`.should('exist');
        // clicks the newly spliced option
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.SELECT_OPTION`.click({ force: true });
        // selects a new Option Durability
        cy.getDataCy`edit-option-name`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY.__CT__.SILL`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY.__CT__.SHIM_SUPPORT`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY.__CT__.SILL_FLASHING`.should('exist');

    })

    it(`can splice a grouped option`, () => {
        // Clicks a node and adds the option
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT`.click({ force: true })
        cy.getDataCy`splice-option-button`.click({ force: true });
        // Selects a grouped option value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.SELECT_OPTION`.click({ force: true })
        cy.getDataCy`edit-option-name`.type('Stops{downarrow}{enter}');
        // option should be in tree
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS`.should('exist')
        // all grouped values should exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.UP`.should('exist')
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.DOWN`.should('exist')
        // Child is put under the right place
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.UP.__PT8__.451T_026`.should('exist')
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.DOWN.__PT8__.451T_026`.should('not.exist')
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT8__.451T_016`.should('not.exist')
    });

    // CHANGES VALUE BY CHANGING CHILD OPTION NAME

    it('can splice an option under a systemDetail', () => {
        // Clicks the SystemDetail
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        // types in child selection
        cy.getDataCy`edit-child-select_option select_option`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a detailOptionValue', () => {
        // Clicks the Detail Option Value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        // types in child selection
        cy.getDataCy`edit-child-select_option select_option`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a detailConfiguration', () => {
        // Clicks the configuration
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        // types in child selection
        cy.getDataCy`edit-child-select_option select_option`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.DURABILITY.STANDARD_DUTY`.should('exist');

    });

    it('can splice an option under a configurationOptionValue', () => {

        // Clicks the configuration Option Value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        // types in child selection
        cy.getDataCy`edit-child-select_option select_option`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.DURABILITY.STANDARD_DUTY`.should('exist');
    });

    it('can splice an option under a value with multiple types under it', () => {
        // Clicks the Detail Option Value
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN`.click({ force: true });
        // Presses the splice-option button
        cy.getDataCy`splice-option-button`.click({ force: true });
        // types in child selection
        cy.getDataCy`edit-child-select_option select_option`.type('Dur{enter}');
        // expect selected option (Durability) to exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY`.should('exist');
        // The first value is selected for Durability
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY.__CT__.SILL`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY.__CT__.SHIM_SUPPORT`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.DOWN.DURABILITY.STANDARD_DUTY.__CT__.SILL_FLASHING`.should('exist');

    })

    it(`can splice a grouped option`, () => {
        // Clicks a node and adds the option
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT`.click({ force: true })
        cy.getDataCy`splice-option-button`.click({ force: true });
        // Selects a grouped option value
        cy.getDataCy`edit-child-select_option select_option`.type('Stops{downarrow}{enter}');
        // option should be in tree
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS`.should('exist')
        // all grouped values should exist
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.UP`.should('exist')
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.DOWN`.should('exist')
        // Child is put under the right place
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.UP.__PT8__.451T_026`.should('exist')
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.STOPS.DOWN.__PT8__.451T_026`.should('not.exist')
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT8__.451T_016`.should('not.exist')
    });

});