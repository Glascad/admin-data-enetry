import COLOR_CODES from '../data/color-index.json';

export default colorCode => {
    const colorObj = COLOR_CODES[colorCode];
    if (colorObj) {
        const { R, G, B } = colorObj;

        const numberToString = num => {
            if (typeof num !== 'number') return num;
            else {
                const str = num.toFixed(0);
                return str.length === 1 ?
                    `0${str}`
                    :
                    str;
            }
        }

        return `#${[R, G, B].map(numberToString).join('')}`;
    }
}
