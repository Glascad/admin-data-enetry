
const storagekeys = {
    jwt: 'JSON-Web-Token',
    project: 'cypress-project-id',
    elevation: 'cypress-elevation-id',
};

const setKey = key => value => window.localStorage.setItem(key, value);
const getKey = key => () => window.localStorage.getItem(key);

export const setJwt = setKey(storagekeys.jwt);
export const setProjectId = setKey(storagekeys.project);
export const setElevationId = setKey(storagekeys.elevation);

export const getJwt = getKey(storagekeys.jwt);
export const getProjectId = getKey(storagekeys.project);
export const getElevationId = getKey(storagekeys.elevation);
