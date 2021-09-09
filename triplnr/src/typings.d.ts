declare var process: Process;

interface Process {
    env: Env
}

interface Env {
    AUTH_DOMAIN: string;
    AUTH_CLIENT_ID: string;
    MAPS_KEY: string;
}

interface GlobalEnvironment {
    process: Process
}