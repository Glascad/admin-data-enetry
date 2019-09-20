
export default class Loggable {

    log = (...logs) => {
        logs.forEach(log => console.log(log));
        console.log(this);
        return this;
    };

    toString = () => `[object ${this.refId || this.constructor.name}]`;
}
