import getUnknownPathAndKeyFromItem from "./get-unknown-path-and-key-from-item";

export default window.getUnknownPathFromItem = item => {
    const [key, path = ''] = getUnknownPathAndKeyFromItem(item);
    return path;
}
