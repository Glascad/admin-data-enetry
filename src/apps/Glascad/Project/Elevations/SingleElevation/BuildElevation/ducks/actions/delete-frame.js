import mergeContainers from './merge-containers';

DELETE_FRAME.getSelectedItems = ({ }) => ({ }) => ([]);

export default function DELETE_FRAME({
    elevationInput,
}, {
    _frame,
    _frame: {
        canDelete,
        vertical,
        firstContainers,
    },
}) {
    if (!canDelete) return arguments[0];

    const direction = [!vertical, false];

    return firstContainers
        .reduce((elevation, container) => mergeContainers(elevation, { container, direction }), arguments[0]);
}
