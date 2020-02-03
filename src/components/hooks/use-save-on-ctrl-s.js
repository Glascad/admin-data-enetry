import { useEffect } from 'react';

export default (save, useCapture) => {
    useEffect(() => {
        const saveOnCtrlS = e => {
            const { key, ctrlKey, metaKey } = e;
            if (key.match(/^s$/i) && (ctrlKey || metaKey)) {
                e.preventDefault();
                save();
            }
        }
        window.addEventListener('keydown', saveOnCtrlS, useCapture);
        return () => window.removeEventListener('keydown', saveOnCtrlS, useCapture);
    }, [save, useCapture]);

    return save;
}
