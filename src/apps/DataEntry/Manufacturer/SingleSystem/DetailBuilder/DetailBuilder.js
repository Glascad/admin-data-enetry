import React from 'react';
import {

} from '../../../../../components';
import Header from './Header/Header';
import DetailDisplay from './DetailDisplay/DetailDisplay';
import Tray from './Tray/Tray';
import Sidebar from './Sidebar/Sidebar';

DetailBuilder.navigationOptions = {
    requiredURLParams: ["path"],
};

export default function DetailBuilder() {
    return (
        <>
            <Header />
            <DetailDisplay />
            <Tray />
            <Sidebar />
        </>
    );
}
