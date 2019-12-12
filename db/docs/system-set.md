
# System Set Rules

Here is a list of all the rules that must be enforced on the system set data.

## Rules by Table

Note that several rules (triggers) apply to multiple tables. These are placed under the table which must be constrained by the foreign table.

### SystemSet (SS)

- Each SS must reference a System (S)
    - [ ] `NOT NULL`
    - [ ] `FOREIGN KEY (SID) > S`
- SS must reference a valid portion of a SystemTree (ST) (either the S itself, or a SystemOptionValue (SOV))
    - [ ] `FOREIGN KEY (SOV) > SOV`
- The selected SystemNode (SN) must be terminal (must contain SystemDetails (SD))
    - [ ] `TRIGGER (S/SOV child = 'system_detail') or (SS(SID, SOV) = SD(SID, PSOV))`
        - must find at least one matching row in SD for each SS
        - applied to tables
            - SS
                - on create/update of SOV
                - BEFORE transaction
            - SD
                - on create/update of PSOV
                - AFTER transaction

### OptionGroupValues (OGV)

- Whenever the SID is changed in the SS, all OGVs must be deleted
    - [ ] `TRIGGER`
        - applied to tables
            - S
                - on create/update of SID
                - BEFORE transaction
                - delete all OGVs
- For each OptionGroup (OG) in the selected S, there must be exactly one corresponding OGV selected
    - | S  | SS  |
      |----|-----|
      | OG | OGV |
    - [ ] `cascading FOREIGN KEY (SID, ON) > OG`
    - [ ] `FOREIGN KEY (SSID, SID) > SS`
    - [ ] `UNIQUE (SSID, ON)`
        - cannot be more than one (for each OG)
    - [ ] `TRIGGER`
        - cannot be less than one (for each OG)
        - applied to tables
            - SS
                - on create/update
                - AFTER transaction
                - make sure that all necessary OGVs exist
            - OG
                - on create
                - AFTER transaction
                - make sure that all necessary OGVs exist
            - OGV
                - on delete
                - BEFORE transaction
                - make sure that no corresponding OG exists

### SystemSetDetails (SSD)

- Whenever the SID is changed in the SS, all SSDs must be deleted
    - [ ] `TRIGGER`
        - applied to tables
            - S
                - on create/update of SID
                - BEFORE transaction
                - delete all SSDs
- For each SD child of the selected SN, there must be exactly one corresponding SSD selected
    - | S  | SS  |
      |----|-----|
      | SD | SSD |
    - [ ] `cascading FOREIGN KEY (SD) > SD`
    - [ ] `UNIQUE (SSID, DT)`
        - cannot be more than one
    - [ ] `TRIGGER`
        - cannot be less than one
        - applied to tables
            - SS
                - on create/update of SID
                - AFTER transaction
                - make sure that all necessary SSDs exist
            - SD
                - on create
                - AFTER transaction
                - make sure that all necessary SSDs exist
            - SSD
                - on delete
                - BEFORE transaction
                - make sure that no corresponding SD exists
- If the selected SN is a SOV, each SSD must reference it as its parent
    - [ ] `FOREIGN KEY (SSD(SSID, SID, PSOV) = SS(ID, SID, SOV))`
    - [ ] `TRIGGER (SSD(SSID, SID, PSOV) = SS(ID, SID, SOV))`
        - must enforce that SOV and PSOV are either both NULL or both NOT NULL (this is unfortunately not enforced by Postgres' FOREIGN KEY)
        - applied to tables
            - SS
                - on create/update of SOV
                - AFTER transaction
            - SSD
                - on create/update of PSOV
                - BEFORE transaction
- Each SSD must reference either a SD or a DetailOptionValue (DOV)
    - [ ] `FOREIGN KEY (SD)`
    - [ ] `FOREIGN KEY (DOV)`
    - [ ] `either_or(SD, DOV)`
        - named `ssd_either_sd_or_dov`
- Each selected SD or DOV must be within selected S/SOV
    - [ ] `SID/DOV @> SD/DOV`
        - named `ssd_parent_matches`
- Each selected DOV must satisfy all selected OGVs
    - [ ] `TRIGGER`
        - for each OGV, DOV must contain OGV after OG, if it contains OG
        - applied to tables
            - OGV
            - SSD
- Each selected SD or DOV must be terminal (must contain DetailConfigurations (DC))
    - [ ] `TRIGGER (SD/DOV child = 'detail_configuration') or (SSD(SD/DOV) = DC(PSD/PDOV))`
        - must find at least one matching row in DC for each SSD
        - applied to tables
            - SSD
                - on create/update of SD/DOV
                - BEFORE transaction
            - DC
                - on create/update of PSD/PDOV
                - AFTER transaction

### SystemSetConfigurations (SSC)

- Whenever the SID is changed in the SS, all SSDs must be deleted
    - [ ] `TRIGGER`
        - applied to tables
            - S
                - on create/update of SID
                - BEFORE transaction
                - delete all SSDs
- Whenever the SD/SOV is changed in the SSD, all SSCs must be deleted
    - [ ] `TRIGGER`
        - applied to tables
            - SSD
                - on create/update of SD
                - BEFORE transaction
                - delete all SSCs
- For each required DC child of each selected SD/DOV, there must be exactly one corresponding SSC selected
    - | S  | SS  |
      |----|-----|
      | SD | SSD |
      | DC | SSC |
    - [ ] `UNIQUE (SSID, DT, CT)`
        - cannot be more than one
    - [ ] `TRIGGER`
        - cannot be less than one
        - applied to tables
            - SSD
                - on create/update of SD/SOV
                - AFTER transaction
                - make sure that all SSCs exist
            - DC
                - on create/update
                - AFTER transaction
                - make sure that all SSCs exist
            - SSC
                - on delete
                - BEFORE transaction
                - make sure that no corresponding required DC exists
- For each optional DC child of each selected SD/DOV, there may be up to one corresponding SSC selected
    - same as above `^^^`
- Each SSC must reference its parent SD/DOV
    - [ ] `FOREIGN KEY (SSID, SD)`
    - [ ] `FOREIGN KEY (SSID, DOV)`
    - [ ] `either_or(SD, DOV)`
        - named `ssc_parent_sd_or_dov`
- Each selected COV must satisfy all selected OGVs
    - [ ] `TRIGGER`
        - for each OGV, COV must contain OGV after OG, if it contains OG
        - applied to tables
            - OGV
            - SSC
- Each selected DC or COV must be terminal (must contain ConfigurationParts (CP))
    - [ ] `TRIGGER (DC/COV child = 'configuration_part') or (SSC(DC/COV) = CP(PDC/PCOV))`
        - must find at least one matching row in CP for each SSC
        - applied to tables
            - SSC
                - on create/update of SD/COV
                - BEFORE transaction
            - CP
                - on create/update of PSD/PCOV
                - AFTER transaction

## Useful Utility Functions

- path_contains_option_group_value
    - `(path, (option_name, option_value_name)) => path !~ on | path ~ on.ovn`
