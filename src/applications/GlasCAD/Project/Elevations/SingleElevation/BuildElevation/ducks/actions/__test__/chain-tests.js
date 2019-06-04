
export default ({ name, initialElevation, actions }) => actions.reduce((elevation, { action, payload }) => action({
    name,
    elevation,
    ...payload,
}), initialElevation);
