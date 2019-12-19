import { print } from 'graphql/language/printer';
import * as CTRLD from './controlled';
import * as AUTH from './authentication';
import * as MNFG from './manufacturer-data';
import * as PRJ from './project-data';
import * as ELVTN from './elevation-data';

export default {
    CTRLD,
    AUTH,
    MNFG,
    PRJ,
    ELVTN,
    print,
};

// console.log(print(PRJ.ENTIRE_SYSTEM_SET))
