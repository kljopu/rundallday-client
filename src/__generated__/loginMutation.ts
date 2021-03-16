/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthLoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: loginMutation
// ====================================================

export interface loginMutation_login {
  __typename: "AuthLoginOutput";
  ok: boolean;
  access_token: string | null;
  error: string | null;
}

export interface loginMutation {
  login: loginMutation_login;
}

export interface loginMutationVariables {
  authLoginInput: AuthLoginInput;
}
