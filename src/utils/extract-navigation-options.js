
/**
 * This function is used by the Navigator and NavMenu components to take the static navigationOptions off of any component, and to generate a name to be displayed in the NavMenu or in a Toggle-/Tab-Navigator, as well as a path that should be used by react-router-dom.
 * 
 * It takes the name of the component (either the function name or the class name) and converts it into the correct spacing and capitalization for display, and for the path. PascalCase is expected.//#endregion
 * 
 * It will take a function called `SystemTypes` and return
 * 
 * {
 *     name: "System Types",
 *     path: "/system-types",
 * }
 */

export default (component, props) => {
    const {
        navigationOptions = {},
        name: functionName = "",
    } = component;

    const options = typeof navigationOptions === 'function' ?
        navigationOptions(props)
        :
        navigationOptions;

    const name = options.name ?
        options.name
        :
        functionName
            .replace(/_|\W/g, '')
            .replace(/([A-Z])/g, (match, _, offset) => offset === 0 ? match : ` ${match}`);

    const path = options.path ?
        options.path
        :
        `/${name.replace(' ', '-').toLowerCase()}`;

    return {
        ...options,
        component,
        name,
        path,
    };
}
