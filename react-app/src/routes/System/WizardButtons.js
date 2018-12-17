import React from 'react';
import { Link } from 'react-router-dom';

export default function WizardButtons() {
    return (
        <>
            <Link
                to="/system/select-system"
                className=""
            >
                Change System
                    </Link>
            <Link
                to={{
                    pathname: "/system/select-system",
                    state: {
                        creating: true,
                    },
                }}
            >
                New System
            </Link>
        </>
    );
}
