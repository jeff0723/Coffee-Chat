// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ExampleEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExampleEntity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ExampleEntity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ExampleEntity", id.toString(), this);
    }
  }

  static load(id: string): ExampleEntity | null {
    return changetype<ExampleEntity | null>(store.get("ExampleEntity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value!.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }

  get previousAdmin(): Bytes {
    let value = this.get("previousAdmin");
    return value!.toBytes();
  }

  set previousAdmin(value: Bytes) {
    this.set("previousAdmin", Value.fromBytes(value));
  }

  get newAdmin(): Bytes {
    let value = this.get("newAdmin");
    return value!.toBytes();
  }

  set newAdmin(value: Bytes) {
    this.set("newAdmin", Value.fromBytes(value));
  }
}

export class CoffeeChat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CoffeeChat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CoffeeChat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CoffeeChat", id.toString(), this);
    }
  }

  static load(id: string): CoffeeChat | null {
    return changetype<CoffeeChat | null>(store.get("CoffeeChat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get placeId(): string {
    let value = this.get("placeId");
    return value!.toString();
  }

  set placeId(value: string) {
    this.set("placeId", Value.fromString(value));
  }

  get lantitude(): BigInt {
    let value = this.get("lantitude");
    return value!.toBigInt();
  }

  set lantitude(value: BigInt) {
    this.set("lantitude", Value.fromBigInt(value));
  }

  get longtitude(): BigInt {
    let value = this.get("longtitude");
    return value!.toBigInt();
  }

  set longtitude(value: BigInt) {
    this.set("longtitude", Value.fromBigInt(value));
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    return value!.toBigInt();
  }

  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get endTime(): BigInt {
    let value = this.get("endTime");
    return value!.toBigInt();
  }

  set endTime(value: BigInt) {
    this.set("endTime", Value.fromBigInt(value));
  }

  get stakeAmount(): BigInt {
    let value = this.get("stakeAmount");
    return value!.toBigInt();
  }

  set stakeAmount(value: BigInt) {
    this.set("stakeAmount", Value.fromBigInt(value));
  }

  get initializer(): Bytes {
    let value = this.get("initializer");
    return value!.toBytes();
  }

  set initializer(value: Bytes) {
    this.set("initializer", Value.fromBytes(value));
  }
}
