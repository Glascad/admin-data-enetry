
export const extractPathData = svg => {
    try {
        const regex = /d="([\s\S]*?)"/g;
        return (svg.match(regex) || [])
            .map(d => d
                .replace(regex, '$1')
                .trim()
                // SVG commands
                .split(/([MLHVZCSQA]\S*[\d,\s]*)/ig)
                .filter(Boolean)
                .map(([command, ...args]) => ({
                    command,
                    arguments: args
                        .join('')
                        .split(/[\s, ]+/g)
                        .filter(Boolean),
                }))
            );
    } catch (err) {
        return err.message;
    }
};
