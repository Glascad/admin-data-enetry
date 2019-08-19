import React, { useState } from 'react';
import Statics from '../Statics/Statics';
import { TitleBar, Pill, ListWrapper } from '../../components';
import optionTree from './options';

console.log({ optionTree });

const renderNextItem = ({ nextOption, details = [] }) => nextOption && Object.keys(nextOption).length ? (
    <Option
        option={nextOption}
    />
) : details.length ? (
    <ListWrapper
        titleBar={{ title: "Details" }}
        identifier="id"
        items={details.map(detail => ({
            ...detail,
            title: detail.name,
        }))}
    >
        {renderNextItem}
    </ListWrapper>
) : null;


function Option({ option: { id, name, values = [] } }) {
    console.log(arguments[0]);
    console.log({ id, name, values });
    return (
        <ListWrapper
            titleBar={{ title: name }}
            identifier="id"
            items={values.map(value => ({
                ...value,
                title: value.name,
            }))}
        >
            {renderNextItem}
        </ListWrapper>
    );
}


function Practice() {
    return (
        <>
            <TitleBar
                title="Test Options"
            />
            <div className="card">
                <Option
                    option={optionTree.options}
                />
            </div>
        </>
    );
}


export default () => <Statics routes={{ Practice }} />
