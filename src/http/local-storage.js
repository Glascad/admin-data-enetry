
export const STORAGE_KEYS = {
    JWT: "jwt",
    RECENT_ACTIVITY: "Recent-Activity",
};

export const getAuthorization = () => {
    const JWT = localStorage.getItem(STORAGE_KEYS.JWT);
    return JWT && `Bearer ${JWT}`;
}
