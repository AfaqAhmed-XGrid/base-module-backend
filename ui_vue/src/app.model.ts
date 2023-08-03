/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Import types
import type { EmbeddedValidationRule, EmbeddedValidationRuleFn } from 'quasar';

// data type to send to backend for sign in
export interface signInFormData {
  email: string
  password: string
}

// data type to send to backend for sign up
export interface signUpFormData {
  email: string
  password: string
  displayName: string
  confirmPassword: string
}

// data type returned by the function providing input fields validation rules
export interface ValidationRules {
  passwordRules: (
    | ((val: string) => true | string)
    | ((val: string) => true | string)
    | ((val: string) => true | string)
    | ((val: string) => true | string)
    | ((val: string) => true | string)
  )[]
  emailRules: ((
    val: string,
    rules: Record<EmbeddedValidationRule, EmbeddedValidationRuleFn>
  ) => true | string)[]
  requiredRule: ((val: string) => true | string)[]
}

// User type fetched from api
export interface User {
  googleId?: string | undefined;
  githubId?: string | undefined;
  displayName: string;
  email?: string | undefined;
  password?: string;
  passwordResetToken?: string | undefined;
  profilePicture?: string | undefined;
  role?: string;
}

// data type of auth status stored in pinia store
export interface AuthStatus {
  loggedIn: boolean;
  user: null | User;
}

// data type of success response for /user endpoint
export interface GetUserSuccessResponse {
  success: 1;
  message: string;
  data: User;
}
