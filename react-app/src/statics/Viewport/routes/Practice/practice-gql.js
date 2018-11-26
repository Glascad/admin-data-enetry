import gql from 'graphql-tag';

export const query = gql`{
    allSystems{
        nodes{
            nodeId
            id
            name
        }
    }
}`;

// export const create_mnfg = {
//     title: "New Manufacturer",
//     mutation: gql`mutation CreateManufacturer($name:String!){
//         createManufacturer(input:{
//             manufacturer:{
//                 name:$name
//             }
//         }){
//             manufacturer{
//                 nodeId
//                 id
//                 name
//             }
//         }
//     }`,
//     update(cache, {
//         data: {
//             createManufacturer: {
//                 manufacturer
//             }
//         }
//     }) {
//         const { allManufacturers } = cache.readQuery({ query });
//         cache.writeQuery({
//             query,
//             data: {
//                 allManufacturers: {
//                     ...allManufacturers,
//                     nodes: allManufacturers.nodes.concat(manufacturer)
//                 }
//             }
//         });
//     }
// };
