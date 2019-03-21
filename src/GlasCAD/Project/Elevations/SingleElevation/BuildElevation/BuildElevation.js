import React, { Component } from 'react';

import { StaticContext } from '../../../../../Statics/Statics';

import RecursiveElevation from '../utils/recursive-elevation/elevation';

import SelectionProvider from './SelectionContext';
import TransformProvider from './TransformContext';

import Header from './Header/Header';
import InteractiveElevation from './InteractiveElevation/InteractiveElevation';
import RightSidebar from './RightSidebar/RightSidebar';

export default class BuildElevation extends Component {

    static contextType = StaticContext;

    componentDidMount = () => this.context.sidebar.toggle(false);

    componentWillUnmount = () => this.context.sidebar.toggle(true);

    render = () => {
        const {
            props: {
                location: {
                    search,
                },
                match: {
                    path,
                },
                queryStatus: {
                    _elevation,
                    _elevation: {
                        name = ''
                    } = {},
                    _system,
                },
            },
            handleFocus,
        } = this;

        const elevation = new RecursiveElevation(_elevation, _system);


        return (
            <SelectionProvider>
                <TransformProvider>
                    <Header
                        name={name}
                        path={path}
                        search={search}
                    />
                    <InteractiveElevation
                        elevation={elevation}
                    />
                    <RightSidebar />
                </TransformProvider>
            </SelectionProvider>
        );
    }
}
