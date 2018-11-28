
<HeadedListContainer
    id="LineWeights"
    title="Line Weights"
    list={{
        items: lineWeights,
        renderItem: ({
            nodeId,
            name,
            weight,
        }) => (
                <Pill
                    key={nodeId}
                    tagname="li"
                    title={`${name} - ${weight}`}
                />
            )
    }}
/>