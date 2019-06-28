import createDetail from './create-detail';
import deleteDetail from './delete-detail';


export default function updateDetailsAfterAddingFrame({
    elevationInput,
    elevationInput: {
        containers,
        containers: {
            length,
        },
    },
}, {
    _frame: {
        firstContainers,
        secondContainers,
        details,
    },
}) {
    const newContainer = containers[length - 1];

    const detailsToCreate = firstContainers.map(container => ({ firstContainer: container, secondContainer: newContainer, vertical: true }))
        .concat(secondContainers.map(container => ({ firstContainer: newContainer, secondContainer: container, vertical: true })))
        .concat({ secondContainer: newContainer, vertical: false })
        .concat({ firstContainer: newContainer, vertical: false });

    const elevationWithAddedDetails = detailsToCreate.reduce((updatedElevation, payload) => createDetail(updatedElevation, payload), arguments[0]);

    const elevationWithDeletedDetails = details.reduce((updatedElevation, detail) => deleteDetail(updatedElevation, {detail}), elevationWithAddedDetails);

    return elevationWithDeletedDetails;
}
