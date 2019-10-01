const { duplicateSQL } = require('../utils');

function testDuplicateSQL({
    path = 'Testing Duplicate SQL',
    sampleFile,
    sampleResult,
}) {
    describe('Testing SQL duplication', () => {
        const result = duplicateSQL(path, sampleFile);
        test('result must be correct', () => {
            expect(result.replace(/\s+/g, ' ')).toBe(sampleResult.replace(/\s+/g, ' '));
        });
    });
}

testDuplicateSQL({
    sampleFile: `
<<LOOP type (system, detail, configuration)>>
SELECT * FROM <<type>>_options o
FULL OUTER JOIN <<type>>_option_values ov
ON ov.parent_<<type>>_option_path = o.path;
<<END LOOP>>
`, sampleResult: `
SELECT * FROM system_options o
FULL OUTER JOIN system_option_values ov
ON ov.parent_system_option_path = o.path;

SELECT * FROM detail_options o
FULL OUTER JOIN detail_option_values ov
ON ov.parent_detail_option_path = o.path;

SELECT * FROM configuration_options o
FULL OUTER JOIN configuration_option_values ov
ON ov.parent_configuration_option_path = o.path;
`,
});

testDuplicateSQL({
    sampleFile: `
<< LOOP
    type (det, conf)
    parent (sys, det)
>>
INSERT INTO <<type>> (parent) VALUES (<<parent>>);
<<END LOOP>>
`, sampleResult: `
INSERT INTO det (parent) VALUES (sys);
INSERT INTO conf (parent) VALUES (det);
`,
});

testDuplicateSQL({
    sampleFile: `
<<LOOP 
    type (system, detail, configuration)
    parent (NULL, system, detail)
>>

CREATE TABLE <<type>>s (
    id SERIAL PRIMARY KEY,
    path LTREE
    <<ONLY type (detail, configuration)>>
    , parent_<<parent>>_path LTREE
    <<END ONLY>>
);

<<END LOOP>>
`, sampleResult: `
CREATE TABLE systems (
    id SERIAL PRIMARY KEY,
    path LTREE
);
CREATE TABLE details (
    id SERIAL PRIMARY KEY,
    path LTREE
    , parent_system_path LTREE
);
CREATE TABLE configurations (
    id SERIAL PRIMARY KEY,
    path LTREE
    , parent_detail_path LTREE
);
`,
});
