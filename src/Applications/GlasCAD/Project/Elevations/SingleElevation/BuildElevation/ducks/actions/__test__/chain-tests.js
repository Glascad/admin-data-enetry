
export default ({ initialElevation, actions }) => actions.reduce((elevation, { action, payload }) => action({
    elevation,
    ...payload,
}), initialElevation);
