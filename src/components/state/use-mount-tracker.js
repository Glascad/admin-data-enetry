import { useEffect } from 'react';

class MountTracker {
    mounted = false;
    unmounted = false;
    mount = () => this.mounted = true;
    unmount = () => this.unmounted = true;
    ifMounted = (cb, ...args) => this.mounted && cb(...args);
    ifUnmounted = (cb, ...args) => this.unmounted && cb(...args);
    ifStillMounted = (cb, ...args) => this.mounted && !this.unmounted && cb(...args);
}

export default function useMountTracker() {
    let tracker = new MountTracker();
    useEffect(() => {
        tracker.mount();
        return tracker.unmount;
    }, []);
    return tracker;
}
