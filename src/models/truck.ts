export class Truck {

    constructor(public id?: string,
                public name?: string,
                public licensePlate?: string,
                public plateExpiration?: string,
                public requiresCdlYesNo?: string,
                public truckStatus?: string,
                public truckYear?: string,
                public vehicleVin?: string,
                public make?: string,
                public model?: string,
                public chgTimeStamp?: string) {
    }

    clone() {
        return new Truck(this.id, this.name, this.licensePlate, this.plateExpiration, this.requiresCdlYesNo, this.truckStatus, this.truckYear, this.vehicleVin, this.make, this.model,
                         this.chgTimeStamp);
    }

}