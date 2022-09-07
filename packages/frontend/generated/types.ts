export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars["Int"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]>;
  number?: InputMaybe<Scalars["Int"]>;
  number_gte?: InputMaybe<Scalars["Int"]>;
};

export type CoffeeChat = {
  __typename?: "CoffeeChat";
  endTime: Scalars["BigInt"];
  id: Scalars["ID"];
  initializer: Scalars["Bytes"];
  isActive?: Maybe<Scalars["Boolean"]>;
  lantitude: Scalars["BigInt"];
  longtitude: Scalars["BigInt"];
  placeId: Scalars["String"];
  stakeAmount: Scalars["BigInt"];
  startTime: Scalars["BigInt"];
};

export type CoffeeChat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  endTime?: InputMaybe<Scalars["BigInt"]>;
  endTime_gt?: InputMaybe<Scalars["BigInt"]>;
  endTime_gte?: InputMaybe<Scalars["BigInt"]>;
  endTime_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  endTime_lt?: InputMaybe<Scalars["BigInt"]>;
  endTime_lte?: InputMaybe<Scalars["BigInt"]>;
  endTime_not?: InputMaybe<Scalars["BigInt"]>;
  endTime_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  initializer?: InputMaybe<Scalars["Bytes"]>;
  initializer_contains?: InputMaybe<Scalars["Bytes"]>;
  initializer_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  initializer_not?: InputMaybe<Scalars["Bytes"]>;
  initializer_not_contains?: InputMaybe<Scalars["Bytes"]>;
  initializer_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  isActive?: InputMaybe<Scalars["Boolean"]>;
  isActive_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  isActive_not?: InputMaybe<Scalars["Boolean"]>;
  isActive_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  lantitude?: InputMaybe<Scalars["BigInt"]>;
  lantitude_gt?: InputMaybe<Scalars["BigInt"]>;
  lantitude_gte?: InputMaybe<Scalars["BigInt"]>;
  lantitude_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  lantitude_lt?: InputMaybe<Scalars["BigInt"]>;
  lantitude_lte?: InputMaybe<Scalars["BigInt"]>;
  lantitude_not?: InputMaybe<Scalars["BigInt"]>;
  lantitude_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  longtitude?: InputMaybe<Scalars["BigInt"]>;
  longtitude_gt?: InputMaybe<Scalars["BigInt"]>;
  longtitude_gte?: InputMaybe<Scalars["BigInt"]>;
  longtitude_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  longtitude_lt?: InputMaybe<Scalars["BigInt"]>;
  longtitude_lte?: InputMaybe<Scalars["BigInt"]>;
  longtitude_not?: InputMaybe<Scalars["BigInt"]>;
  longtitude_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  placeId?: InputMaybe<Scalars["String"]>;
  placeId_contains?: InputMaybe<Scalars["String"]>;
  placeId_contains_nocase?: InputMaybe<Scalars["String"]>;
  placeId_ends_with?: InputMaybe<Scalars["String"]>;
  placeId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  placeId_gt?: InputMaybe<Scalars["String"]>;
  placeId_gte?: InputMaybe<Scalars["String"]>;
  placeId_in?: InputMaybe<Array<Scalars["String"]>>;
  placeId_lt?: InputMaybe<Scalars["String"]>;
  placeId_lte?: InputMaybe<Scalars["String"]>;
  placeId_not?: InputMaybe<Scalars["String"]>;
  placeId_not_contains?: InputMaybe<Scalars["String"]>;
  placeId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  placeId_not_ends_with?: InputMaybe<Scalars["String"]>;
  placeId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  placeId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  placeId_not_starts_with?: InputMaybe<Scalars["String"]>;
  placeId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  placeId_starts_with?: InputMaybe<Scalars["String"]>;
  placeId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  stakeAmount?: InputMaybe<Scalars["BigInt"]>;
  stakeAmount_gt?: InputMaybe<Scalars["BigInt"]>;
  stakeAmount_gte?: InputMaybe<Scalars["BigInt"]>;
  stakeAmount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  stakeAmount_lt?: InputMaybe<Scalars["BigInt"]>;
  stakeAmount_lte?: InputMaybe<Scalars["BigInt"]>;
  stakeAmount_not?: InputMaybe<Scalars["BigInt"]>;
  stakeAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  startTime?: InputMaybe<Scalars["BigInt"]>;
  startTime_gt?: InputMaybe<Scalars["BigInt"]>;
  startTime_gte?: InputMaybe<Scalars["BigInt"]>;
  startTime_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  startTime_lt?: InputMaybe<Scalars["BigInt"]>;
  startTime_lte?: InputMaybe<Scalars["BigInt"]>;
  startTime_not?: InputMaybe<Scalars["BigInt"]>;
  startTime_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
};

export enum CoffeeChat_OrderBy {
  EndTime = "endTime",
  Id = "id",
  Initializer = "initializer",
  IsActive = "isActive",
  Lantitude = "lantitude",
  Longtitude = "longtitude",
  PlaceId = "placeId",
  StakeAmount = "stakeAmount",
  StartTime = "startTime"
}

export type ExampleEntity = {
  __typename?: "ExampleEntity";
  count: Scalars["BigInt"];
  id: Scalars["ID"];
  newAdmin: Scalars["Bytes"];
  previousAdmin: Scalars["Bytes"];
};

export type ExampleEntity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  count?: InputMaybe<Scalars["BigInt"]>;
  count_gt?: InputMaybe<Scalars["BigInt"]>;
  count_gte?: InputMaybe<Scalars["BigInt"]>;
  count_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  count_lt?: InputMaybe<Scalars["BigInt"]>;
  count_lte?: InputMaybe<Scalars["BigInt"]>;
  count_not?: InputMaybe<Scalars["BigInt"]>;
  count_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  newAdmin?: InputMaybe<Scalars["Bytes"]>;
  newAdmin_contains?: InputMaybe<Scalars["Bytes"]>;
  newAdmin_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  newAdmin_not?: InputMaybe<Scalars["Bytes"]>;
  newAdmin_not_contains?: InputMaybe<Scalars["Bytes"]>;
  newAdmin_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  previousAdmin?: InputMaybe<Scalars["Bytes"]>;
  previousAdmin_contains?: InputMaybe<Scalars["Bytes"]>;
  previousAdmin_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  previousAdmin_not?: InputMaybe<Scalars["Bytes"]>;
  previousAdmin_not_contains?: InputMaybe<Scalars["Bytes"]>;
  previousAdmin_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
};

export enum ExampleEntity_OrderBy {
  Count = "count",
  Id = "id",
  NewAdmin = "newAdmin",
  PreviousAdmin = "previousAdmin"
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc"
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  coffeeChat?: Maybe<CoffeeChat>;
  coffeeChats: Array<CoffeeChat>;
  exampleEntities: Array<ExampleEntity>;
  exampleEntity?: Maybe<ExampleEntity>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryCoffeeChatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCoffeeChatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<CoffeeChat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CoffeeChat_Filter>;
};

export type QueryExampleEntitiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<ExampleEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExampleEntity_Filter>;
};

export type QueryExampleEntityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Subscription = {
  __typename?: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  coffeeChat?: Maybe<CoffeeChat>;
  coffeeChats: Array<CoffeeChat>;
  exampleEntities: Array<ExampleEntity>;
  exampleEntity?: Maybe<ExampleEntity>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionCoffeeChatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCoffeeChatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<CoffeeChat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CoffeeChat_Filter>;
};

export type SubscriptionExampleEntitiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<ExampleEntity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ExampleEntity_Filter>;
};

export type SubscriptionExampleEntityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  number: Scalars["Int"];
  /** Timestamp of the block if available, format depends on the chain */
  timestamp?: Maybe<Scalars["String"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny"
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {}
};
export default result;
