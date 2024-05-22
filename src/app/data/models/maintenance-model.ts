import { IMaintenance } from "@models/interfaces/maintenance-interface";

export class MaintenanceModel {
  public equipmentId?: string;
  public clientId?: string;
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deleted?: boolean;
  public amount?: number;
  public date?: Date;
  public support?: string;

  constructor({
    clientId,
    createdAt,
    deleted,
    updatedAt,
    id,
    amount,
    equipmentId,
    date,
    support,
  }: IMaintenance) {
    this.equipmentId = equipmentId;
    this.amount = amount;
    this.clientId = clientId;
    this.createdAt = createdAt;
    this.deleted = deleted;
    this.updatedAt = updatedAt;
    this.id = id;
    this.date = date;
    this.support = support;
  }

  public copyWith({
    equipmentId,
    clientId,
    createdAt,
    deleted,
    updatedAt,
    id,
    amount,
    date,
    support,
  }: IMaintenance): MaintenanceModel {
    return new MaintenanceModel({
      equipmentId: equipmentId ?? this.equipmentId,
      amount: amount ?? this.amount,
      clientId: clientId ?? this.clientId,
      createdAt: createdAt ?? this.createdAt,
      deleted: deleted ?? this.deleted,
      updatedAt: updatedAt ?? this.updatedAt,
      id: id ?? this.id,
      date: date ?? this.date,
      support: support ?? this.support,
    });
  }

  public fromRawJson(str: string): MaintenanceModel {
    return MaintenanceModel.fromJson(JSON.parse(str));
  }

  public toRawJson(): string {
    return JSON.stringify(this.toJson());
  }

  public static fromJson(json: any): MaintenanceModel {
    return new MaintenanceModel({
      equipmentId: json['equipmentId'] != null ? json['equipmentId'] : '',
      clientId: json['clientId'] != null ? json['clientId'] : '',
      createdAt: json['createdAt'] != null ? json['createdAt'].toDate() : null,
      deleted: json['deleted'] != null ? json['deleted'] : false,
      updatedAt: json['updatedAt'] != null ? json['updatedAt'].toDate() : null,
      id: json['id'] != null ? json['id'] : '',
      amount: json['amount'] != null ? json['amount'] : 0,
      date: json['date'] != null ? json['date'].toDate() : null,
      support: json['support'] != null ? json['support'] : '',
    });
  }

  public toJson(): any {
    return {
      equipmentId: this.equipmentId,
      clientId: this.clientId,
      createdAt: this.createdAt,
      deleted: this.deleted,
      updatedAt: this.updatedAt,
      id: this.id,
      amount: this.amount,
      date: this.date,
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
