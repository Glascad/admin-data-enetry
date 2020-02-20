import { print } from 'graphql/language/printer';
import * as AUTH from './authentication';
import * as CTRLD from './controlled';
import * as MNFG from './manufacturer';
import * as ELVTN from './project/elevation';
import * as PRJ from './project/project';
import * as SST from './project/system-set';

const PROJ = { ...PRJ, ...SST };

export default {
    CTRLD,
    AUTH,
    MNFG,
    PROJ,
    ELVTN,
    print,
};

// console.log(print(PROJ.ENTIRE_SYSTEM_SET))
