export default function ItemName({ selectedItem: { __typename = '' } }) {
    const props = arguments[0];
    const NameComponent = match(__typename)
        .regex(/Value$/, ValueName)
        .regex(/Option$/, OptionName)
        .equals('System', SystemName)
        .equals('ConfigurationPart', PartNumber)
        .otherwise(DetailOrConfigurationType);
    return <NameComponent {...props} />;
};