import { ISales } from "@models/interfaces/sales-interface";

export class SaleModel {
  public equipments?: string;
  public client?: string;
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deleted?: boolean;
  public amount?: number;
  public supplies?: string;


  constructor({
    client,
    createdAt,
    deleted,
    updatedAt,
    id,
    amount,
    equipments,
    supplies,
  }: ISales) {
    this.equipments = equipments;
    this.amount = amount;
    this.client = client;
    this.createdAt = createdAt;
    this.deleted = deleted;
    this.updatedAt = updatedAt;
    this.id = id;
    this.supplies = supplies;
  }

  public copyWith({
    equipments,
    client,
    createdAt,
    deleted,
    updatedAt,
    id,
    amount,
    supplies
  }: ISales): SaleModel {
    return new SaleModel({
      equipments: equipments ?? this.equipments,
      amount: amount ?? this.amount,
      client: client ?? this.client,
      createdAt: createdAt ?? this.createdAt,
      deleted: deleted ?? this.deleted,
      updatedAt: updatedAt ?? this.updatedAt,
      id: id ?? this.id,
      supplies: supplies ?? this.supplies,
    });
  }

  public fromRawJson(str: string): SaleModel {
    return SaleModel.fromJson(JSON.parse(str));
  }

  public toRawJson(): string {
    return JSON.stringify(this.toJson());
  }

  public static fromJson(json: any): SaleModel {
    return new SaleModel({
      equipments: json['equipments'] != null ? json['equipments'] : '',
      client: json['client'] != null ? json['client'] : '',
      createdAt: json['createdAt'] != null ? json['createdAt'].toDate() : null,
      deleted: json['deleted'] != null ? json['deleted'] : false,
      updatedAt: json['updatedAt'] != null ? json['updatedAt'].toDate() : null,
      id: json['id'] != null ? json['id'] : '',
      amount: json['amount'] != null ? json['amount'] : 0,
      supplies: json['supplies'] != null ? json['supplies'] : '',
    });
  }

  public toJson(): any {
    return {
      equipments: this.equipments,
      client: this.client,
      createdAt: this.createdAt,
      deleted: this.deleted,
      updatedAt: this.updatedAt,
      id: this.id,
      amount: this.amount,
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
