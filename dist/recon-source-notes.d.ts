import type { ReconSourceCrossCheck, ReconSourcePacket } from "./source-types";
type ReconSourceNotesProps = {
    packet: ReconSourcePacket | null;
    crossCheck?: ReconSourceCrossCheck | null;
    publicMode?: boolean;
};
export declare function ReconSourceNotes({ packet, crossCheck, publicMode, }: ReconSourceNotesProps): import("react").JSX.Element | null;
export {};
