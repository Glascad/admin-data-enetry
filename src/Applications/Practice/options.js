
const data = {
    allOptions: [
        {
            parentValueId: null,
            parentDetailId: null,
            id: 1,
            name: "Set",
            values: [
                { id: 1, name: "Front" },
                { id: 2, name: "Center" },
                { id: 3, name: "Back" },
                { id: 4, name: "Multi-Plane" },
            ],
        },
        // Front Set
        {
            parentValueId: 1,
            parentDetailId: null,
            id: 2,
            name: "Joinery",
            values: [
                { id: 5, name: "Screw Spline" },
                { id: 6, name: "Shear Block" },
                { id: 7, name: "Stick" },
                { id: 8, name: "Type B" },
            ],
        },
        // Center Set
        {
            parentValueId: 2,
            parentDetailId: null,
            id: 3,
            name: "Joinery",
            values: [
                { id: 9, name: "Screw Spline" },
                { id: 10, name: "Shear Block" },
                { id: 11, name: "Stick" },
            ],
        },
        // Back Set
        {
            parentValueId: 3,
            parentDetailId: null,
            id: 4,
            name: "Joinery",
            values: [
                { id: 12, name: "Screw Spline" },
                { id: 13, name: "Shear Block" },
                { id: 14, name: "Stick" },
            ],
        },
        // Multi-Plane Set
        {
            parentValueId: 4,
            parentDetailId: null,
            id: 5,
            name: "Joinery",
            values: [
                { id: 15, name: "Screw Spline" },
                { id: 16, name: "Shear Block" },
                { id: 17, name: "Stick" },
            ],
            hoistedOptionNames: ["Glazing", "Stops"],
        },
        // Center Set > Screw Spline > Head
        {
            parentValueId: null,
            parentDetailId: 1,
            id: 6,
            name: "Stops",
            values: [
                { id: 18, name: "Up" },
                { id: 19, name: "Down" },
            ],
        },
        // Center Set > Screw Spline > Head > Stops Up
        {
            parentValueId: 18,
            parentDetailId: null,
            id: 7,
            name: "Glazing",
            values: [
                { id: 20, name: "Inside" },
                { id: 21, name: "Outside" },
            ],
        },
        // Center Set > Screw Spline > Head > Stops Down
        {
            parentValueId: 19,
            parentDetailId: null,
            id: 8,
            name: "Glazing",
            values: [
                { id: 22, name: "Inside" },
                { id: 23, name: "Outside" },
            ],
        },
    ],
    allDetails: [
        // Center Set > Screw Spline
        {
            parentValueId: 9,
            parentDetailId: null,
            id: 1,
            name: "Head",
        },
        {
            parentValueId: 9,
            parentDetailId: null,
            id: 2,
            name: "Horizontal",
        },
        {
            parentValueId: 9,
            parentDetailId: null,
            id: 3,
            name: "Sill",
        },
    ],
};

const deepFreeze = obj => {
    if (typeof obj === 'object') {
        Object.freeze(obj);
        Object.values(obj).forEach(deepFreeze);
    }
    return obj;
}

class DetailNode {
    constructor({ id, name }, { allOptions, allDetails }, registerNode) {
        Object.assign(this, {
            type: "DetailNode",
            id,
            name,
            nextOption: new OptionNode(allOptions.find(({ parentDetailId }) => parentDetailId === id) || {}, { allOptions, allDetails }, registerNode),
        });
        deepFreeze(this);
        registerNode(this);
    }
}

class ValueNode {
    constructor({ id, name }, { allOptions, allDetails }, registerNode) {
        Object.assign(this, {
            type: "ValueNode",
            id,
            name,
            nextOption: new OptionNode(allOptions.find(({ parentValueId }) => parentValueId === id) || {}, { allOptions, allDetails }, registerNode),
            details: allDetails.filter(({ parentValueId }) => parentValueId === id).map(detail => new DetailNode(detail, { allOptions, allDetails }, registerNode)),
        });
        deepFreeze(this);
        registerNode(this);
    }
}

class OptionNode {
    constructor({ id, name, values = [] }, { allOptions, allDetails }, registerNode) {
        if (id) {
            Object.assign(this, {
                type: "OptionNode",
                id,
                name,
                values: values.map(value => new ValueNode(value, { allOptions, allDetails }, registerNode)),
            });
        }
        deepFreeze(this);
        registerNode(this);
    }
}

class OptionTree {
    constructor({ allOptions, allDetails }) {
        const head = allOptions.find(({ parentValueId, parentDetailId }) => !parentValueId && !parentDetailId);
        if (!head) throw new Error(`Must have first option with no parent id`);
        this.nodes = {};
        this.options = new OptionNode(head, { allOptions, allDetails }, this.registerNode);
        this.type = "OptionTree";
        deepFreeze(this);
        allOptions.forEach(({ id, type }) => {
            if (!this.nodes.OptionNode[id]) throw new Error(`Orphan ${type} with id: ${id}`);
        });
    }
    registerNode = node => {
        const { id, type } = node;
        if (id === undefined) return;
        if (!this.nodes[type]) this.nodes[type] = {};
        if (this.nodes[type][id]) throw new Error(`Duplicate ${type} with id: ${id}`);
        else this.nodes[type][id] = node;
    }
}

export default new OptionTree(data);
