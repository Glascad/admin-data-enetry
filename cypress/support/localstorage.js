
const storagekeys = {
    project: 'cypress-project-id',
    elevation: 'cypress-elevation-id',
};

const setKey = key => value => window.localStorage.setItem(key, value);
const getKey = key => () => window.localStorage.getItem(key);

export const setProjectId = setKey(storagekeys.project);
export const setElevationId = setKey(storagekeys.elevation);
export const getProjectId = getKey(storagekeys.project);
export const getElevationId = getKey(storagekeys.elevation);
