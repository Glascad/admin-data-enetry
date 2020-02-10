const precision = 100;

const round = num => Math.round(num * precision) / precision;

class ComparableMeasurement {
    constructor(measurement, first) {
        this.rawMeasurement = measurement;
        this.measurement = round(measurement);
        this.first = first;
    }

    isFartherThan = ({ measurement }) => (
        this.first ?
            this.measurement < measurement
            :
            this.measurement > measurement
    );

    isCloserThan = ({ measurement }) => (
        this.first ?
            this.measurement > measurement
            :
            this.measurement < measurement
    );

    isEqualTo = ({ measurement }) => this.measurement === measurement;

    isFartherThanOrEqualTo = measurement => (
        this.isFartherThan(measurement)
        ||
        this.isEqualTo(measurement)
    );

    isCloserThanOrEqualTo = measurement => (
        this.isCloserThan(measurement)
        ||
        this.isEqualTo(measurement)
    );
}

export default class ComparablePlacement {
    constructor(placement, vertical, first) {
        this.placement = placement;
        this.vertical = vertical;
        this.first = first;

        const offsetKey = vertical ? 'x' : 'y';

        const dimensionKey = vertical ? 'width' : 'height';

        this.inner = new ComparableMeasurement(
            first ?
                placement[offsetKey] + placement[dimensionKey]
                :
                placement[offsetKey],
            first,
        );

        this.outer = new ComparableMeasurement(
            first ?
                placement[offsetKey]
                :
                placement[offsetKey] + placement[dimensionKey],
            first,
        );
    }
}