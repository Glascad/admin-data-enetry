import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import './Viewport.scss';
// import routes from '../../routes/routes';
import { Card } from '../../components';

// HOME
import Home from '../../routes/Home/Home';
// SYSTEM
import SelectSystem from '../../routes/System/SelectSystem/SelectSystem';
import SystemInfo from '../../routes/System/SystemInfo/SystemInfo';
import GlazingInfo from '../../routes/System/GlazingInfo/GlazingInfo';
import ValidTypes from '../../routes/System/ValidTypes/ValidTypes';
import SystemCompatibility from '../../routes/System/SystemCompatibility/SystemCompatibility';
import SystemOptions from '../../routes/System/SystemOptions/SystemOptions';
import InvalidCombinations from '../../routes/System/InvalidCombinations/InvalidCombinations';
// SYSTEM CONFIGURATIONS
import SystemTypes from '../../routes/SystemConfigurations/SystemTypes/SystemTypes';
import SystemTags from '../../routes/SystemConfigurations/SystemTags/SystemTags';
import DetailTypes from '../../routes/SystemConfigurations/DetailTypes/DetailTypes';
import ConfigurationTypes from '../../routes/SystemConfigurations/ConfigurationTypes/ConfigurationTypes';
import PartTypes from '../../routes/SystemConfigurations/PartTypes/PartTypes';
import PartTags from '../../routes/SystemConfigurations/PartTags/PartTags';
// SETTINGS
import Manufacturers from '../../routes/Settings/Manufacturers/Manufacturers';
import Linetypes from '../../routes/Settings/LinetypesView/LinetypesView';
import PartOrientations from '../../routes/Settings/PartOrientations/PartOrientations';
// import Fasteners from '../../routes/Settings/Fasteners/Fasteners';
import InfillSizes from '../../routes/Settings/InfillSizes/InfillSizes';
import InfillTypes from '../../routes/Settings/InfillTypesView/InfillTypesView';
// PRACTICE
import Practice from '../../routes/Practice/Practice';


function Viewport() {
    return (
        <div id="Viewport">
            <Card>
                <Switch>
                    {/* HOME */}
                    <Route
                        exact={true}
                        path="/"
                        component={Home}
                    />
                    {/* SYSTEM */}
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
                    {/* SYSTEM CONFIGURATIONS */}
                    < Route
                        path="/system-configurations/system-types"
                        component={SystemTypes}
                    />
                    <Route
                        path="/system-configurations/system-tags"
                        component={SystemTags}
                    />
                    <Route
                        path="/system-configurations/detail-types"
                        component={DetailTypes}
                    />
                    <Route
                        path="/system-configurations/configuration-types"
                        component={ConfigurationTypes}
                    />
                    <Route
                        path="/system-configurations/part-types"
                        component={PartTypes}
                    />
                    <Route
                        path="/system-configurations/part-tags"
                        component={PartTags}
                    />
                    {/* SETTINGS */}
                    <Route
                        path="/settings/manufacturers"
                        component={Manufacturers}
                    />
                    <Route
                        path="/settings/linetypes"
                        component={Linetypes}
                    />
                    <Route
                        path="/settings/part-orientations"
                        component={PartOrientations}
                    />
                    <Route
                        path="/settings/infill-sizes"
                        component={InfillSizes}
                    />
                    <Route
                        path="/settings/infill-types"
                        component={InfillTypes}
                    />
                    <Route
                        path="/settings/practice"
                        component={Practice}
                    />
                </Switch>
            </Card>
        </div>
    );
}

export default withRouter(Viewport);

