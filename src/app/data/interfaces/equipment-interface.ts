export interface IEquipment {
    serial: string, 
    brand?: string,
    model?: string,
    clientId?: string,
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    id?: string;
    rentalValue?: number;
    saleValue?: number;
  }
  