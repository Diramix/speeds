export {};

interface PlayerInstance {
    id: string;
    setSpeed: (speed: string) => void;
}

declare global {
    interface Window {
        _ymPlayers: PlayerInstance[];
        webpackChunk_N_E: any[] & {
            push: (item: [symbol[], {}, (r: (id: number) => Record<string, unknown>) => void]) => void;
        };
        speedsObserver: MutationObserver | null;
        nextmusicApi: {
            setSpeed: (speed: string) => void;
        } | null;
    }
}
