import React from 'react';
import './Card.scss';

export default function Card({
    children,
}) {
    return (
        <div className="Card">
            {children}
        </div>
    );
}
