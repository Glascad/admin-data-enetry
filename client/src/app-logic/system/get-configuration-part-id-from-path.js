
export default window.getConfigurationPartIdFromPath = path => +path.replace(/^.*\.__PT(\d+)__.*$/g, '$1');
