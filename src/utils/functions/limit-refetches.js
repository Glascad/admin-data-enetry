
export default (limit = 2, waitTimeout = 500, resetTimeout = 60000) => {
    let refetchCount = 0;
    let awaitingRefetch = false;
    return refetch => {
        if (refetchCount++ <= limit) {
            if (!awaitingRefetch) {
                awaitingRefetch = true;
                setTimeout(async () => {
                    try {
                        await refetch();
                    } catch (e) {
                        console.error(e);
                    }
                    awaitingRefetch = false;
                }, waitTimeout);
            }
        } else {
            if (resetTimeout) setTimeout(() => refetchCount = 0, resetTimeout);
        }
    }
}
