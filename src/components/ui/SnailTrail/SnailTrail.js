import React from 'react';
import { normalCase } from '../../../utils';
import './SnailTrail.scss';

export default function SnailTrail({
    trail = [],
}) {
    console.log(arguments);
    return (
        <div className="SnailTrail">
            {trail.map((item, i) => item ? (
                <span
                    key={i}
                >
                    {i === 0 ? null : (
                        <span className="snail-trail-divider">
                            &nbsp;
                            >
                            &nbsp;
                        </span>
                    )}
                    <span className="snail-trail-item">
                        {normalCase(item)}
                    </span>
                </span>
            ) : null)}
        </div>
    );
}
