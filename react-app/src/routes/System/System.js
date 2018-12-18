import React from 'react';
import { Switch, Route } from 'react-router-dom';
// SYSTEM
import SelectSystem from './SelectSystem/SelectSystem';
import SystemInfo from './SystemInfo/SystemInfo';
import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
import SystemCompatibility from './SystemCompatibility/SystemCompatibility';
import SystemOptions from './SystemOptions/SystemOptions';
import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

export default function SystemRouter() {
    return (
        <Switch>
            <Route
                path="/system/select-system"
                component={SelectSystem}
            />
            <Route
                path="/system/system-info/:systemNID"
                component={SystemInfo}
            />
            <Route
                path="/system/glazing-info/:systemNID"
                component={GlazingInfo}
            />
            <Route
                path="/system/valid-types/:systemNID"
                component={ValidTypes}
            />
            <Route
                path="/system/system-compatibility/:systemNID"
                component={SystemCompatibility}
            />
            <Route
                path="/system/system-options/:systemNID"
                component={SystemOptions}
            />
            <Route
                path="/system/invalid-combinations/:systemNID"
                component={InvalidCombinations}
            />
        </Switch>
    );
}
