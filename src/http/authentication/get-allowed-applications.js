import { match } from "../../utils";

export default role => Promise.all(
    match(role)
        .regex(/admin/i, () => [
            'DataEntry',
            'Glascad',
        ])
        .regex(/data.entry/i, [
            'DataEntry',
        ])
        .regex(/client/i, [
            'Glascad',
        ])
        .otherwise([
            // 'DataEntry',
            // 'Glascad',
        ])
        .map(async name => ({
            name,
            module: await import(`../../apps/${name}/${name}`)
        }))
);
