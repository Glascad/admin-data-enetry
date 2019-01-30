import React, { Component } from 'react';

import dataModel from './data-model';

import Container from './Container';

import {
    SelectionWrapper,
} from '../../../components';
import Frame from './Frame';

class Elevation extends Component {

    state = dataModel;

    updateCount = 0;

    render = () => {
        const {
            state: {
                elevation: {
                    nodeId,
                    hzRO,
                    vtRO,
                    elevationContainers = [],
                    sightline,
                },
            },
            props: {
                selectedNID,
                handleSelect,
            },
        } = this;

        console.log(this.state);

        return (
            <svg
                key={this.updateCount++}
                className="Elevation"
                transform="scale(1, -1)"
                height={vtRO + sightline * 6}
                width={hzRO + sightline * 6}
            >
                <Container
                    origin={[0, 0]}
                    corner={[hzRO, vtRO]}
                    childContainers={elevationContainers.map(({ container }) => container)}
                    sightline={sightline}
                    horizontal={true}
                    nodeId={nodeId}
                    selectedNID={selectedNID}
                    handleSelect={handleSelect}
                />
            </svg>
        );
    }
}

export default function () {
    return (
        <SelectionWrapper>
            {selection => (
                <Elevation
                    {...selection}
                />
            )}
        </SelectionWrapper>
    );
}

// export default class extends Component {
//     state = {
//         value: 0,
//     };
//     render = () => (
//         <svg
//             height="210"
//             width="210"
//         >
//             {console.log(this.state)}
//             <path
//                 d="M5,5L5,200L200,200L200,5Z"
//                 fill="red"
//                 stroke="orange"
//                 stroke-width="5"
//                 onClick={() => this.setState({ value: this.state.value + 5 })}
//             />
//             <path
//                 d={`M100,100
//                 L${100 + this.state.value},100
//                 L${100 + this.state.value},${100 + this.state.value}
//                 L100,${100 + this.state.value}
//                 Z`}
//                 fill="yellow"
//                 stroke="yellow"
//             />
//             <Frame
//                 origin={[0, 0]}
//                 corner={[this.state.value, this.state.value]}
//                 fill="white"
//             />
//         </svg>
//     )
// }
