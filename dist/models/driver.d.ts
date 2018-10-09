export declare class Driver {
    id: string;
    firstname: string;
    lastname: string;
    alias: string;
    driversLicenseNumber: string;
    primarySecYesNo: string;
    activeYesNo: string;
    driverAdjustYesNo: string;
    cdlYesNo: string;
    cdlExpiration: string;
    employeeYesNo: string;
    chgTimeStamp: string;
    username: string;
    constructor(id?: string, firstname?: string, lastname?: string, alias?: string, driversLicenseNumber?: string, primarySecYesNo?: string, activeYesNo?: string, driverAdjustYesNo?: string, cdlYesNo?: string, cdlExpiration?: string, employeeYesNo?: string, chgTimeStamp?: string, username?: string);
    clone(): Driver;
}
