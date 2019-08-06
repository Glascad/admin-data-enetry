import React, { PureComponent } from 'react';

import SystemInfo from './SystemInfo/SystemInfo';
// import GlazingInfo from './GlazingInfo/GlazingInfo';
import ValidTypes from './ValidTypes/ValidTypes';
// import SystemOptions from './SystemOptions/SystemOptions';
// import InvalidCombinations from './InvalidCombinations/InvalidCombinations';

import {
    TabNavigator,
} from '../../../../../components';

import { system as defaultSystem } from './ducks/default';
import mergeSystemUpdate from './ducks/merge';
import { _removeFakeIds } from './ducks/actions/utils';
import { parseSearch } from '../../../../../utils';

const subroutes = {
    SystemInfo,
    // GlazingInfo,
    ValidTypes,
    // SystemOptions,
    // InvalidCombinations,
};

export default class SystemDatabase extends PureComponent {

    static navigationOptions = {
        name: "Database",
        path: "/database",
        subroutes,
    };

    state = {
        system: defaultSystem,
    };

    updateSystem = (ACTION, payload) => this.setState(state => ACTION(state, payload));

    save = async () => {
        const {
            state: {
                system,
            },
            props: {
                history,
                location: {
                    // get full path
                    pathname,
                    search,
                },
                queryStatus: {
                    _system: {
                        id,
                    } = {},
                },
                mutations: {
                    updateEntireSystem,
                },
            },
            reset,
        } = this;

        const update = _removeFakeIds(system);

        try {

            console.log({ update });

            const result = await updateEntireSystem({
                system: {
                    ...update,
                    id,
                },
            });

            console.log({ result });

            const {
                data: {
                    updateEntireSystem: {
                        system: {
                            id: systemId,
                        },
                    },
                },
            } = result;

            reset();

            history.push(`${pathname}${parseSearch(search).update({ systemId })}`);

        } catch (err) {
            console.error(err);
        }
    }

    reset = () => this.setState({ system: defaultSystem });

    render = () => {
        const {
            state: {
                system,
            },
            props: {
                queryStatus,
                mutations,
            },
            save,
            reset,
            updateSystem,
        } = this;

        const updatedSystem = mergeSystemUpdate(system, queryStatus);

        // console.log(updatedSystem);

        const routeProps = {
            queryStatus,
            mutations,
            system: updatedSystem,
            updateSystem,
        };

        return (
            <TabNavigator
                routeProps={routeProps}
                routes={subroutes}
            >
                <div className="bottom-buttons">
                    <button
                        className="empty"
                        onClick={reset}
                    >
                        Reset
                    </button>
                    <button
                        className="action"
                        onClick={save}
                    >
                        Save
                    </button>
                </div>
            </TabNavigator>
        );
    }
}
