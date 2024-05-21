import { IUser } from '../interfaces/user-interface';

export class UserModel {
  public name?: string;
  public lastName?: string;
  public documentType?: string;
  public documentId?: string;
  public phoneNumber?: string;
  public email?: string;
  public rol?: string;
  public address?: string;
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deleted?: boolean;


  constructor({
    name,
    lastName,
    documentType,
    documentId,
    phoneNumber,
    email,
    rol,
    address,
    createdAt,
    deleted,
    updatedAt,
    id,
  }: IUser) {
    this.name = name;
    this.lastName = lastName;
    this.documentType = documentType;
    this.documentId = documentId;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.rol = rol;
    this.address = address;
    this.createdAt = createdAt;
    this.deleted = deleted;
    this.updatedAt = updatedAt;
    this.id = id;
  }

  public copyWith({
    name,
    lastName,
    documentType,
    documentId,
    phoneNumber,
    email,
    rol,
    address,
    createdAt,
    deleted,
    updatedAt,
    id,
  }: IUser): UserModel {
    return new UserModel({
      name: name ?? this.name,
      lastName: lastName ?? this.lastName,
      documentType: documentType ?? this.documentType,
      documentId: documentId ?? this.documentId,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      email: email ?? this.email,
      rol: rol ?? this.rol,
      address: address ?? this.address,
      createdAt: createdAt ?? this.createdAt,
      deleted: deleted ?? this.deleted,
      updatedAt: updatedAt ?? this.updatedAt,
      id: id ?? this.id,
    });
  }

  public fromRawJson(str: string): UserModel {
    return UserModel.fromJson(JSON.parse(str));
  }

  public toRawJson(): string {
    return JSON.stringify(this.toJson());
  }

  public static fromJson(json: any): UserModel {
    return new UserModel({
      name: json['name'] != null ? json['name'] : '',
      lastName: json['lastName'] != null ? json['lastName'] : '',
      documentType: json['documentType'] != null ? json['documentType'] : '',
      documentId: json['documentId'] != null ? json['documentId'] : '',
      phoneNumber: json['phoneNumber'] != null ? json['phoneNumber'] : 0,
      email: json['email'] != null ? json['email'] : '',
      rol: json['rol'] != null ? json['rol'] : '',
      address: json['address'] != null ? json['address'] : '',
      createdAt: json['createdAt'] != null ? json['createdAt'].toDate() : null,
      deleted: json['deleted'] != null ? json['deleted'] : false,
      updatedAt: json['updatedAt'] != null ? json['updatedAt'].toDate() : null,
      id: json['id'] != null ? json['id'] : '',
    });
  }

  public toJson(): any {
    return {
      name: this.name,
      lastName: this.lastName,
      documentType: this.documentType,
      documentId: this.documentId,
      phoneNumber: this.phoneNumber,
      email: this.email,
      rol: this.rol,
      address: this.address,
      createdAt: this.createdAt,
      deleted: this.deleted,
      updatedAt: this.updatedAt,
      id: this.id,
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
