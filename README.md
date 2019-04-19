
# GlasCAD

### Applications

[Admin Data Entry](#admin)

[Configuration Data Entry](#configuration)

[End Client Application](#client)



## Elevation Builder Presentation

Building elevations is the number-one use for the end customer.
- Elevation data structure in database
- GUI for interacting with elevation data structure

The elevation data structure will integrate with system data to select configurations and produce details.
- We already have a thread of this connection
    - Detail & configuration types

- Recap project sets & keyplans
- Create elevation
- Build elevation
    - Zoom & pan
    - Selection
        - Clicking
            - Glass
            - Frames
            - Dimensions
            - Details
        - Arrow keys
            - Shift key
    - Dimensions
    - Moving frames
    - Undo / redo



### How To Select A Configuration To Edit (SVG Data Entry)

- Select a System
    - System Type
        - System Type Detail Types
        - System Type Detail Type Configuration Types
            - Required/Optional
            - Mirrorable
    - System Configuration Overrides (overrides system type detail type configuration types)
        - Required/Optional
        - Mirrorable
    - Invalid System Configuration Types (overrides system type detail type configuration types)
        (Maybe should converge with sytem configuration overrides)
    - System Option Values
        - Configuration Option Values
        - Mirrorable
    - System Infill Pocket Types
        - System Infill Pocket Type Detail Types
    - Manufacturer Configuration Name Overrides

### Overall issues:
- Routing
    - Switching between applications
    - Routing within an application
- Authentication
- Testing
- Hosting
- Database changes
    - Seed file
    - RDB diagram
- Documentation
    - Application architecture diagram
- Using Trello


## <a name="admin"></a> Admin Data Entry

### Overall issues:
- Routing
    - Sidebar vs Viewport
- Wizard component (with tabs)
- Migration of all pages to new components
- **Refactor of all UI components**
    - MultiSelect Modal
        - titles & labels
    - Replace HeadedContainer/HeadedListContainer with Header component

### Features to add:
- Sidebar Collapse
- Sorting/filtering/grouping & defaults
- Feedback on pending requests
    - Pending state of Pills & Inputs
- Dynamic input size in Pills
- \`"\` in number inputs (for inches)
- Input validation
- Override/presentation levels
- Non-deletable items (items with dependent objects)
    - Reports of dependent objects
- Created-/updated-/deleted-at/-by dates
- Info/help components
- Drag and drop
- Activity page

### Things to discuss:
- Routing patterns
- Refactor of UI components
- Management of state
- Organization of Apollo code


## <a name="configuration"></a> Configuration Data Entry

...

## <a name="client"></a> End Client Application

...
