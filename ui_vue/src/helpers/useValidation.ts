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
import type { ValidationRules } from '@/app.model';

// Import constants
import constants from '../app.constants';

/**
 * Function to rturn input validation rules 
 * @return {ValidationRules} return validation rules for all kind of inputs like email, password and displayNames
 */
const useValidation = (): ValidationRules => {
  const passwordRules = [
    (val: string) => (val && val.length >= 8) || constants.validation.messages.short,
    (val: string) =>
      constants.validation.regex.hasLowerCaseAlpha.test(val) ||
      constants.validation.messages.noLowerAlpha,
    (val: string) =>
      constants.validation.regex.hasUpperCaseAlpha.test(val) ||
      constants.validation.messages.noUpperAlpha,
    (val: string) => constants.validation.regex.hasNum.test(val) || constants.validation.messages.noNum,
    (val: string) =>
      constants.validation.regex.hasSpecialChar.test(val) ||
      constants.validation.messages.noSpecialChar
  ];
  
  const emailRules = [(val: string, rules: Record<EmbeddedValidationRule, EmbeddedValidationRuleFn>) => rules.email(val) || constants.validation.messages.notEmail];
  const requiredRule = [(val: string) => (val && val !== '') || constants.validation.messages.required];

  return { passwordRules, emailRules, requiredRule };
};

export default useValidation;
