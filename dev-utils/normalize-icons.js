const filesToJSON = require('./files-to-json');
const pfs = require('./promise-fs');

const assetsFolder = `src/assets`;

const iconsFolder = `icons`;

const updatedIconsFolder = `updated-icons`;

const pathToAssets = `${__dirname}/../${assetsFolder}`;

const pathToIcons = `${pathToAssets}/${iconsFolder}`;

const pathToUpdatedIcons = `${pathToAssets}/${updatedIconsFolder}`;

(async () => {

    const normalizeIcon = icon => {
        return icon
            .replace(/<\?xml.*?>/, '')
            .replace(/(<svg)/, `$1 class="icon" `)
            .replace(/id=".*?"/g, '')
            .replace(/<!--.*?-->/, '')
            .replace(/<title>.*?<\/title>/, '')
            .replace(/<desc>.*?<\/desc>/, '')
            .replace(/(<\w+)(.*)(fill|stroke)(=")(#.{6})(")(.*)(>)/g, (str, open, before, fillOrStroke, equals, color, quote, after, close) => `${
                open
                } class${
                equals
                }${
                fillOrStroke
                }-${
                color === "#0CFC04" ?
                    'green'
                    :
                    color === "#D0021B" ?
                        'red'
                        :
                        color === "#878787" || color === "#878687" || color === "#8B8A8B" || color === "#979797" ?
                            'gray'
                            :
                            color === "#585858" || color === "#585758" ?
                                'dark-gray'
                                :
                                color
                }${
                quote
                }${
                before
                }${
                after
                }${
                close
                }`
            );
    }

    const updatedIcons = await filesToJSON(pathToUpdatedIcons);

    Object.entries(updatedIcons)
        .forEach(async ([fileName, rawIcon]) => {

            const title = fileName
                .replace(/ /g, '-')
                .replace(/\.svg/, '')
                .toLowerCase();

            const icon = normalizeIcon(rawIcon);

            try {
                await pfs.writeFile(`${pathToIcons}/${title}.svg`, icon);
            } catch (err) {
                console.error("ERROR:");
                console.error(err);
                // console.error("EXTRACTING TITLE:");
                // const title = extractTitle(rawIcon, true)
                console.error("TITLE, ICON, RAWICON:");
                console.error({
                    title,
                    icon,
                    rawIcon,
                });
            }
        });

    const fileNameToCamelCase = fileName => fileName
        .replace(/\.svg/, '')
        .split('-')
        .map(str => `${
            str.slice(0, 1).toUpperCase()
            }${
            str.slice(1).toLowerCase()
            }`)
        .join('');

    const icons = await filesToJSON(pathToIcons);

    // const oldIndexJS = await pfs.readFile(`${pathToIcons}/index.js`);

    // const [oldImports, rawOldExports] = oldIndexJS.split('export');

    const newFileNames = Object.keys(icons).filter(fileName => fileName.match(/\.svg/));

    const newIconNames = newFileNames.map(fileNameToCamelCase);

    const newImports = newFileNames
        .reduce((otherImports, fileName, i) => {
            const iconName = newIconNames[i];
            return `import { ReactComponent as ${iconName} } from './${fileName}';\n${otherImports}`;
        }, '');

    const newExports = `export {\n    ${newIconNames.join(',\n    ')},\n};`;

    const indexJS = `// This file was automatically generated in ${__dirname}/dev-utils/normalize-icons.js\n\n${newImports}\n${newExports}`;

    await pfs.writeFile(`${pathToIcons}/index.js`, indexJS);

    console.log('success');

})();
