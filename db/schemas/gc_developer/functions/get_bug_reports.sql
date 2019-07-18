DROP FUNCTION IF EXISTS get_bug_reports;

CREATE OR REPLACE FUNCTION get_bug_reports()
RETURNS entire_bug_report[] AS $$
DECLARE
    brs entire_bug_report[];
    br bug_reports%ROWTYPE;
BEGIN
    FOR br IN (
        SELECT * FROM bug_reports
        ORDER BY timestamp ASC
    ) LOOP
        brs := brs || ROW(
            br.id,
            (SELECT username FROM users WHERE id = br.user_id),
            br.location,
            br.report,
            br.state,
            br.timestamp
        )::entire_bug_report;
    END LOOP;

    RETURN brs;
END;
$$ LANGUAGE plpgsql STABLE;
