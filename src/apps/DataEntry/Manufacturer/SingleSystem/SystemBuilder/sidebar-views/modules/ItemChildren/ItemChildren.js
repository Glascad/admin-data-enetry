export default function ItemName({ selectedItem: { __typename = '' } }) {
    const props = arguments[0];
    const ChildrenComponent = match(__typename)
        .regex(/Option$/, OptionChildren)
        .otherwise('System', ValueAndTypeChildren)
    return <ChildrenComponent {...props} />;
};