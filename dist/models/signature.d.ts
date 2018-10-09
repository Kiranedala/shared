export declare class Signature {
    imageBase64: string;
    mode: string;
    signeeName: string;
    dateSigned: string;
    stopId: string;
    shipmentId: string;
    fileName: string;
    path: string;
    id: number;
    static readonly LANDSCAPE: string;
    static readonly PORTRAIT: string;
    constructor(imageBase64?: string, mode?: string, signeeName?: string, dateSigned?: string, stopId?: string, shipmentId?: string, fileName?: string, path?: string, id?: number);
}
