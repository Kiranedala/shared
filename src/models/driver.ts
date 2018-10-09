export class Driver {

    constructor(public id?: string,
                public firstname?: string,
                public lastname?: string,
                public alias?: string,
                public driversLicenseNumber?: string,
                public primarySecYesNo?: string,
                public activeYesNo?: string,
                public driverAdjustYesNo?: string,
                public cdlYesNo?: string,
                public cdlExpiration?: string,
                public employeeYesNo?: string,
                public chgTimeStamp?: string,
                public username?: string) {
    }

    clone(): Driver {
        return new Driver(this.id, this.firstname, this.lastname, this.alias, this.driversLicenseNumber, this.primarySecYesNo, this.activeYesNo, this.driverAdjustYesNo, this.cdlYesNo, this.cdlExpiration, this.employeeYesNo,
            this.chgTimeStamp);
    }
}