import React from 'react';
import { getConfigurationTypeFromPath } from '../../../../../../app-logic/system-utils';

export default function DetailDisplay({
    detailType,
    detailOptionValuePath,
    configurations,
}) {
    return (
        <div className="system-set-detail">
            <div
                data-cy={`DETAIL.${
                    detailType
                    }${
                    detailOptionValuePath
                        .replace(/.*__DT__\.\w+\./, '.')
                        .replace(/\.?VOID\.?/g, '')
                    }`}
            >
                {detailOptionValuePath}
                {/* DETAIL.{
                                        detailType
                                    }{
                                        detailOptionValuePath
                                            .replace(/.*__DT__\.\w+\./, '.')
                                            .replace(/\.?VOID\.?/g, '')
                                    } */}
            </div>
            {configurations.map(({
                detailConfiguration: {
                    path,
                    optional,
                },
                selection: {
                    configurationOptionValuePath,
                } = {},
            }, i) => !optional || configurationOptionValuePath ? (
                <div
                    key={configurationOptionValuePath || path}
                    data-cy={`CONFIGURATION.${
                        detailType
                        }.${
                        getConfigurationTypeFromPath(configurationOptionValuePath || path)
                        }${
                        (configurationOptionValuePath || path)
                            .replace(/.*__CT__\.\w+\.?/, '.')
                            .replace(/\.?VOID\.?/g, '')
                        }`}
                >
                    {configurationOptionValuePath}
                    {/* CONFIGURATION.{
                                            detailType
                                        }.{
                                            getConfigurationTypeFromPath(configurationOptionValuePath || path)
                                        }{
                                            (configurationOptionValuePath || path)
                                                .replace(/.*__CT__\.\w+\.?/, '.')
                                                .replace(/\.?VOID\.?/g, '')
                                        } */}
                </div>
            ) : null)}
        </div>
    );
}
