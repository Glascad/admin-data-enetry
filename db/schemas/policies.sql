
ALTER TABLE gc_public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY project_owner ON gc_public.projects
USING (
    owner_id = get_current_user_id()
);

-- CREATE POLICY admin_read ON gc_public.projects
-- FOR SELECT
-- TO gc_admin
-- USING (true);
