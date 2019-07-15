import React from 'react';
import { withTransformContext } from "../../contexts/TransformContext";

const ContainerId = ({ refId, transform: { scale: { x, y } } }) => (
    <div className="text">
        <div
            style={{
                transform: `scale(${1 / x}, ${1 / y})`,
            }}
        >
            {
                refId
                    .replace(/\D*/, '*')
                    .replace(/</, '*')
                    .replace(/>/, '*')
                    .split('*')
                    .filter(Boolean)
                    .map((text, i) => (
                        <span key={i}>{text}</span>
                    ))
                // .replace(/<.*/, '')
            }
        </div>
    </div>
);

export default withTransformContext(ContainerId);