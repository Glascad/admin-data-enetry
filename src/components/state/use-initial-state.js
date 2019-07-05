import { useState, useEffect } from 'react';

export default function useInitialState(initialState, dependencies) {

    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(initialState);
    }, dependencies);

    return [state, setState];
}
