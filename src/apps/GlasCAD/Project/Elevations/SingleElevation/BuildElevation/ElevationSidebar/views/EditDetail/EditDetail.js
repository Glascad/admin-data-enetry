import React, { useContext } from 'react';
import { getConfigurationTypeFromPath, getUnknownPathFromItem } from '../../../../../../../../../app-logic/system';
import { TitleBar } from '../../../../../../../../../components';
import DetailOrConfigurationOrPart from '../../../../../../../../../modules/Detail/DetailOrConfigurationOrPart';
import { SelectionContext } from '../../../contexts/SelectionContext';

export default {
    title: "Edit Detail",
    component: EditDetail,
};

function EditDetail({
    systemMap,
    systemSet,
    systemSet: {
        _systemSetDetails = [],
        _systemSetConfigurations = [],
    } = {},
}) {

    const {
        items,
        items: {
            0: {
                refId,
                detailType,
                detailId,
                configurationTypes,
            } = {},
        },
    } = useContext(SelectionContext);

    const pathContainsDetail = (path, detailType) => path.match(new RegExp(`\\.__DT__\\.${detailType}\\b`));

    const itemContainsDetail = (item, detailType) => pathContainsDetail(getUnknownPathFromItem(item), detailType);

    const systemSetDetail = _systemSetDetails.find(ssd => itemContainsDetail(ssd, detailType));

    const detailPath = getUnknownPathFromItem(systemSetDetail);

    const configurationPaths = _systemSetConfigurations.reduce((paths, ssc) => ({
        ...paths,
        ...(
            itemContainsDetail(ssc, detailType) ?
                { [getConfigurationTypeFromPath(getUnknownPathFromItem(ssc))]: getUnknownPathFromItem(ssc) }
                :
                null)
    }), {});

    return (
        <>
            <TitleBar
                title="Edit Detail"
                snailTrail={[detailId]}
            />
            {configurationTypes
                .slice()
                .sort(({ required: a }, { required: b }) => a === b ? 0 : b)
                .map(({ _configurationType: { id, type }, required }) => (
                    <button
                        key={id}
                        className="sidebar-button empty"
                    >
                        <div className="icon">{required ? "R" : "O"}</div>
                        <span>{type}</span>
                    </button>
                ))}
            <DetailOrConfigurationOrPart
                {...{
                    systemMap,
                    configurationPaths,
                    path: detailPath,
                }}
            />
        </>
    );
}
