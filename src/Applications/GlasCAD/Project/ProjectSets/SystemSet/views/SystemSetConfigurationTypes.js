import React, { PureComponent } from 'react';
import _ from 'lodash';
import { ListWrapper, Input, GroupingBox } from '../../../../../../components';
import { normalCase } from '../../../../../../utils';

SystemSetConfigurationTypes.navigationOptions = {
    path: "/configuration-types",
    name: "Optional Parts",
};

export default function SystemSetConfigurationTypes({
    queryResult: {
        _systemSet: {
            _systemSetDetailTypeConfigurationTypes = [],
            _system: {
                _invalidSystemConfigurationTypes = [],
                _systemConfigurationOverrides = [],
                _systemType: {
                    _systemTypeDetailTypes = [],
                } = {},
            } = {},
        } = {},
    }
}) {
    // console.log(arguments[0]);
    const allConfigurationTypes = _systemTypeDetailTypes
        .reduce((all, {
            detailType,
            _systemTypeDetailTypeConfigurationTypes
        }) => all.concat(
            _systemTypeDetailTypeConfigurationTypes
                .filter(({ configurationType, required }) => (
                    (
                        !required
                        ||
                        _systemConfigurationOverrides.some(sco => (
                            (
                                sco.detailType === detailType
                            ) && (
                                sco.configurationType === configurationType
                            ) && (
                                sco.required === false
                            )
                        ))
                    )
                    &&
                    !_invalidSystemConfigurationTypes.some(isct => (
                        isct.detailType === detailType
                        &&
                        isct.configurationType === configurationType
                    ))
                ))
        ), []);

    // console.log({ allConfigurationTypes });

    const groupedConfigurationTypes = _.groupBy(allConfigurationTypes, 'configurationType');

    // console.log({ groupedConfigurationTypes });

    return (
        <>
            {Object.entries(groupedConfigurationTypes).map(([ct, dts]) => {
                if (dts.length > 1) {
                    return (
                        <GroupingBox
                            className="input-group"
                            style={{ alignItems: 'center' }}
                            title={ct}
                        >
                            {dts.map(({ detailType }) => (
                                <Input
                                    label={`At ${detailType}`}
                                    type="switch"
                                    checked={_systemSetDetailTypeConfigurationTypes.some(ssdtct => (
                                        (
                                            ssdtct.detailType === detailType
                                        ) && (
                                            ssdtct.configurationType === ct
                                        )
                                    ))}
                                />
                            ))}
                        </GroupingBox>
                    )
                } else {
                    const [{ detailType }] = dts;
                    return (
                        <Input
                            label={`At ${detailType}`}
                            title={ct}
                            type="switch"
                            checked={_systemSetDetailTypeConfigurationTypes.some(ssdtct => (
                                (
                                    ssdtct.detailType === detailType
                                ) && (
                                    ssdtct.configurationType === ct
                                )
                            ))}
                        />
                    );
                }
            })}
        </>
    );
}
