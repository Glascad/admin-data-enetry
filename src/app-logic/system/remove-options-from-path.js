
export default path => path.replace(/(\.__((PT\d+)|(CT)|(DT))__\.\w+)\..*?$/, '$1');
