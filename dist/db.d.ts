import { type Client } from "@libsql/client";
declare global {
    var vaexilDbClient: Client | undefined;
    var vaexilDbReady: Promise<void> | undefined;
}
export declare function getDb(): Client;
export declare function ensureDb(): Promise<void>;
