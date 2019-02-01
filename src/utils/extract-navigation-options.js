
export default (Component, props) => {
    const {
        navigationOptions = {},
        name: functionName = "",
    } = Component;

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
    
    console.log({
        ...options,
        component: Component,
        name,
        path,
        Component,
        functionName,
    });

    return {
        ...options,
        component: Component,
        name,
        path,
    };
}
