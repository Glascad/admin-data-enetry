const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');
const chalk = require('chalk');
const path = require('path');

const {
    env: {
        SERVER_PORT,
        CONNECTION_STRING,
        DO_GC_CONNECTION_STRING,
        // DO_GC_PRACTICE_CONNECTION_STRING,
        JWT_SECRET,
    },
} = process;

module.exports = function startServer() {

    const APP = express();

    APP.use(cors());

    APP.use(express.static(path.join(__dirname, '/../build/')));

    APP.use(postgraphile(
        DO_GC_CONNECTION_STRING,
        // DO_GC_PRACTICE_CONNECTION_STRING,
        [
            'gc_data',
            'gc_public',
            'gc_protected',
            'gc_private',
            'gc_controlled',
            'gc_utils',
        ],
        {
            graphiql: true,
            jwtPgTypeIdentifier: "gc_controlled.jwt",
            jwtSecret: JWT_SECRET,
            exportGqlSchemaPath: `${__dirname}/../compiled/gql-schema.gql`,
            exportJsonSchemaPath: `${__dirname}/../src/schemas/_schema.json`,
            pgDefaultRole: 'unauthorized',
            // handleErrors: (errors, req, res) => {
            //     console.log(res.statusMessage);
            //     // console.log(Object.keys(res));
            //     // console.log(res.req);
            //     if (errors.length) {
            //         const filteredErrors = errors.filter(({ message }) => (
            //             req.headers.authorization
            //             ||
            //             !message.match(/authorization.*header.*not.*correct.*format/i))
            //         );
            //         if (filteredErrors.length !== errors.length) {
            //             console.log(req.headers.authorization);
            //         } if (filteredErrors.length) {
            //             errors.forEach(({ message }) => console.error(message));
            //             res.statusMessage = `Postgraphile errors: "${filteredErrors.map(({ message }) => message).join(`", "`)}"`;
            //             return errors;
            //         } else {
            //             res.statusCode = 401;
            //             res.statusMessage = 'Invalid authentication';
            //         }
            //     }
            //     console.log(`${chalk.blue('Response:')} statusCode: ${chalk.gray(res.statusCode)}, statusMessage: ${chalk.gray(res.statusMessage)}`);
            // },
            // extendedErrors: ['severity', 'code', 'detail', 'hint', 'where', 'schema', 'table', 'column', 'dataType', 'constraint'],
            // pgDefaultRole: 'glascad',
        },
    ));

    APP.get('*', (_, res) => res.status(200).sendFile(path.join(__dirname, '/../build/')));

    APP.listen(SERVER_PORT, () => console.log(chalk`${chalk.blueBright(`[glascad]`)} listening on port ${SERVER_PORT}`));

}
