import { match } from "../../utils";

export default window.getTypenameFromPath = path => {

    const Type = match(path)
        .regex(/__PT-?\d+__/, 'Part')
        .regex(/__CT__/, 'Configuration')
        .regex(/__DT__/, 'Detail')
        .otherwise('System');
    
    const Parent = match(Type)
        .against({
            Part: 'Configuration',
            Configuration: 'Detail',
            Detail: 'System',
        })
        .otherwise('');
    
    const count = (path.replace(/.*__(D|C|P)T-?\d*__\./, '').match(/\./g) || []).length;
    
    return count === 0 ?
        `${Parent}${Type}`
        :
        count % 2 ?
            `${Type}Option`
            :
            `${Type}OptionValue`;
}
