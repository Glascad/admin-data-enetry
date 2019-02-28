import React, { Component } from 'react';

import { StaticContext } from '../../../../../Statics/Statics';

import {
    TitleBar,
} from '../../../../../components';

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    componentDidMount = () => this.context.sidebar.toggle(false);

    render = () => {
        return (
            <div className="card">
                <TitleBar
                    title="Build Elevation"
                />
            </div>
        );
    }
}
