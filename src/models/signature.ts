export class Signature {

    public static readonly LANDSCAPE: string = 'LANDSCAPE';
    public static readonly PORTRAIT: string = 'PORTRAIT';

    constructor(public imageBase64?: string,
                public mode?: string,
                public signeeName?: string,
                public dateSigned?: string,
                public stopId?: string,
                public shipmentId?: string,
                public fileName?: string,
                public path?: string,
                public id?: number) {
    }

}