import { useState } from 'react';
import { AsyncModal } from '../Modal/Modal';

export default function useModal(modalProps) {

    const [display, setDisplay] = useState(false);

    return {
        Modal,
        setDisplay,
    };
}
