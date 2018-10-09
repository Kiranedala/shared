export declare class Truck {
    id: string;
    name: string;
    licensePlate: string;
    plateExpiration: string;
    requiresCdlYesNo: string;
    truckStatus: string;
    truckYear: string;
    vehicleVin: string;
    make: string;
    model: string;
    chgTimeStamp: string;
    constructor(id?: string, name?: string, licensePlate?: string, plateExpiration?: string, requiresCdlYesNo?: string, truckStatus?: string, truckYear?: string, vehicleVin?: string, make?: string, model?: string, chgTimeStamp?: string);
    clone(): Truck;
}
