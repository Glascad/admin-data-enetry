
export default (...files) => Promise.all(
    files.map(file => (
        new Promise((resolve, reject) => {
            console.log(files);
            const reader = new FileReader();
            console.log({ reader });
            reader.onload = ({
                target: {
                    result: contents
                }
            }) => resolve({
                file,
                contents,
            });
            reader.readAsText(file);
        }))
    )
);
