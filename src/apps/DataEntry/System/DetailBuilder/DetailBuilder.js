import React from 'react';
import {
    
} from '../../../../components';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import DetailDisplay from './DetailDisplay/DetailDisplay';

export default function DetailBuilder() {
    return (
        <>
            <Header/>
            <Sidebar/>
            <DetailDisplay/>
        </>
    );
}
