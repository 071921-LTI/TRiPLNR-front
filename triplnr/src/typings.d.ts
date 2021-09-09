declare var process: Process;

interface Process {
    env: Env
}

interface Env {
    AUTH_DOMAIN: string;
    AUTH_CLIENT_ID: string;
}

interface GlobalEnvironment {
    process: Process
}