export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  tokens: TokenResponse;
  user: User;
};

export type Budget = {
  __typename?: 'Budget';
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  expiresAt: Scalars['Date'];
  id: Scalars['String'];
  members: Array<User>;
  owner: User;
  title: Scalars['String'];
  transactions: Array<Transaction>;
};

export type CreateBudgetInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateTransactionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBudget: Budget;
  createTransaction: Transaction;
  createUser: User;
  removeBudget: Budget;
  removeTransaction: Transaction;
  removeUser: Scalars['Boolean'];
  updateBudget: Budget;
  updateTransaction: Transaction;
};


export type MutationCreateBudgetArgs = {
  createBudgetInput: CreateBudgetInput;
};


export type MutationCreateTransactionArgs = {
  createTransactionInput: CreateTransactionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveBudgetArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTransactionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBudgetArgs = {
  updateBudgetInput: UpdateBudgetInput;
};


export type MutationUpdateTransactionArgs = {
  updateTransactionInput: UpdateTransactionInput;
};

export type Query = {
  __typename?: 'Query';
  budget: Budget;
  budgets: Array<Budget>;
  login: AuthPayload;
  loginWithThirdParty: Scalars['String'];
  me: User;
  transaction: Transaction;
  transactions: Array<Transaction>;
  users: Array<User>;
};


export type QueryBudgetArgs = {
  id: Scalars['Int'];
};


export type QueryLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type QueryLoginWithThirdPartyArgs = {
  thirdPartyLogin: ThirdPartyLogin;
};


export type QueryTransactionArgs = {
  id: Scalars['Int'];
};

export type ThirdPartyLogin = {
  type: Scalars['String'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['String'];
  budget: Budget;
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  user: User;
};

export type UpdateBudgetInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateTransactionInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  budgets: Array<Budget>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  ownedBudgets: Array<Budget>;
  transactions: Array<Transaction>;
};
