import React, { PureComponent, createContext } from 'react';

export const SettingsContext = createContext();

export default class SettingsProvider extends PureComponent {

    state = {
        shouldRender: {
            detailBubbles: false,
            glassMarks: false,
            infillColors: false,
            dimensions: true,
            sightlines: false,
            caulkSizes: false,
            lockedFrames: false,
            equalFrames: false,
            stopFrames: false,
            gridBubbles: false,
        },
    };

    updateSetting = key => ({ target: { checked } }) => this.setState({
        [key]: checked,
    });

    render = () => {
        const {
            state: {
                shouldRender,
            },
            updateSetting,
        } = this;

        return (
            <SettingsContext.Provider
                value={{
                    shouldRender,
                    updateSetting,
                }}
            >
                {children}
            </SettingsContext.Provider>
        )
    }
}
