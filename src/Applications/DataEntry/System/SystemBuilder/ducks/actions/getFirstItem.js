export default function getFirstItem({ _systemOptions }) {

    return _systemOptions.find(({ parentSystemOptionValueId }) => !parentSystemOptionValueId);

};