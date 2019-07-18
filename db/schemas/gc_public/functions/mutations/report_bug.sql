DROP FUNCTION IF EXISTS report_bug;

CREATE OR REPLACE FUNCTION report_bug(
    location TEXT,
    report TEXT,
    state JSON
)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO bug_reports (
        user_id,
        location,
        report,
        state
    ) VALUES (
        get_current_user_id(),
        location,
        report,
        state
    );
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
