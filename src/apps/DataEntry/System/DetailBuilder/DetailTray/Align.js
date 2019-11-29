import React from 'react';
import * as Icons from '../../../../../assets/icons';
import { Input } from '../../../../../components';
import { usePartialAction } from '../../ducks/hooks';
import { getViewBox } from '../../../../../utils/functions/svg-utils';


export default function ({
    selectedItem,
    selectedItem: {
        transform,
    } = {},
    selectItem,
    dispatchTransform,
}) {

    const { partialAction, dispatchPartial, cancelPartial } = usePartialAction({ selectItem });

    return (
        <div className="tray-section">
            <div className="label">
                Align
                </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignBottom}
                    onChange={()=>console.log("AlignBottom")}
                />
                <Input
                    Icon={Icons.AlignMiddle}
                    onChange={()=>console.log("AlignMiddle")}
                />
                <Input
                    Icon={Icons.AlignTop}
                    onChange={()=>console.log("AlignTop")}
                />
            </div>
            <div className="input-group">
                <Input
                    Icon={Icons.AlignLeft}
                    onChange={()=>console.log("AlignLeft")}
                />
                <Input
                    Icon={Icons.AlignCenter}
                    onChange={()=>console.log("AlignCenter")}
                />
                <Input
                    Icon={Icons.AlignRight}
                    onChange={()=>console.log("AlignRight")}
                />
            </div>
        </div>
    );
};