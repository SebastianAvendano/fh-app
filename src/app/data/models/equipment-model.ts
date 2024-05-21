import { IEquipment } from '../interfaces/equipment-interface';

export class EquipmentModel {
  public serial?: string;
  public brand?: string;
  public clientId?: string;
  public model?: string;
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deleted?: boolean;
  public rentalValue?: number;
  public saleValue?: number;

  constructor({
    serial,
    brand,
    clientId,
    model,
    createdAt,
    deleted,
    updatedAt,
    id,
    rentalValue,
    saleValue
  }: IEquipment) {
    this.serial = serial;
    this.brand = brand;
    this.clientId = clientId;
    this.model = model;
    this.createdAt = createdAt;
    this.deleted = deleted;
    this.updatedAt = updatedAt;
    this.id = id;
    this.rentalValue = rentalValue;
    this.saleValue = saleValue;
  }

  public copyWith({
    serial,
    brand,
    clientId,
    model,
    createdAt,
    deleted,
    updatedAt,
    id,
    rentalValue,
    saleValue,
  }: IEquipment): EquipmentModel {
    return new EquipmentModel({
      serial: serial ?? this.serial,
      brand: brand ?? this.brand,
      clientId: clientId ?? this.clientId,
      model: model ?? this.model,
      createdAt: createdAt ?? this.createdAt,
      deleted: deleted ?? this.deleted,
      updatedAt: updatedAt ?? this.updatedAt,
      id: id ?? this.id,
      rentalValue: rentalValue ?? this.rentalValue,
      saleValue: saleValue ?? this.saleValue,
    });
  }

  public fromRawJson(str: string): EquipmentModel {
    return EquipmentModel.fromJson(JSON.parse(str));
  }

  public toRawJson(): string {
    return JSON.stringify(this.toJson());
  }

  public static fromJson(json: any): EquipmentModel {
    return new EquipmentModel({
      serial: json['serial'] != null ? json['serial'] : '',
      brand: json['brand'] != null ? json['brand'] : '',
      clientId: json['clientId'] != null ? json['clientId'] : '',
      model: json['model'] != null ? json['model'] : '',
      createdAt: json['createdAt'] != null ? json['createdAt'].toDate() : null,
      deleted: json['deleted'] != null ? json['deleted'] : false,
      updatedAt: json['updatedAt'] != null ? json['updatedAt'].toDate() : null,
      id: json['id'] != null ? json['id'] : '',
      saleValue: json['saleValue'] != null ? json['saleValue'] : 0,
      rentalValue: json['rentalValue'] != null ? json['rentalValue'] : 0,
    });
  }

  public toJson(): any {
    return {
      serail: this.serial,
      brand: this.brand,
      model: this.model,
      clientId: this.clientId,
      createdAt: this.createdAt,
      deleted: this.deleted,
      updatedAt: this.updatedAt,
      id: this.id,
      rentalValue: this.rentalValue,
      saleValue: this.saleValue,
    };
  }

  public toJsonRemovingEmptyFields() {
    return Object.fromEntries(
      Object.entries(this.toJson()).filter((object): boolean =>
        object[1] ? true : false
      )
    );
  }
}
