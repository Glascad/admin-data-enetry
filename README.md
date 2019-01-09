
# GlasCAD

### Applications

[Admin Data Entry](#admin)

[Configuration Data Entry](#configuration)

[End Client Application](#client)

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
