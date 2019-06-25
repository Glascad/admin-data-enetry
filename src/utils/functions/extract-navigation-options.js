
/**
 * This function is used by the Navigator and NavMenu components to take the static navigationOptions off of any component, and to generate a name to be displayed in the NavMenu or in a Toggle-/Tab-Navigator, as well as a path that should be used by react-router-dom.
 * 
 * It takes the name of the component (either the function name or the class name) and converts it into the correct spacing and capitalization for display, and for the path. PascalCase is expected.
 * 
 * extractNavigationOptions is no longer recursive. It must be individually invoked on each route component and will no longer look at the children.
 * 
 * It will take a function called `SystemTypes` and return
 * 
 * {
 *     name: "System Types",
 *     path: "/system-types",
 * }
 */

export default (functionName, component, props, log = false) => {
    const {
        navigationOptions = {},
    } = component;

    const {
        name = functionName
            .replace(/_|\W/g, '')
            .replace(/([A-Z])/g, (match, _, offset) => offset === 0 ? match : ` ${match}`),
        path = `/${name.replace(/ +/g, '-').toLowerCase()}`,
        subroutes,
        ...options
    } = typeof navigationOptions === 'function' ?
            navigationOptions(props)
            :
            navigationOptions;

    if (log) {
        // console.log({
        //     name,
        //     path,
        //     functionName,
        //     navigationOptions,
        //     options,
        //     props,
        //     subroutes,
        // });
    }

    return {
        ...options,
        component,
        name,
        path,
        subroutes,
    };
}
