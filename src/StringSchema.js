/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
class StringSchema {
  validator = (value) => typeof value === 'string';

  constructor(validators = []) {
    this.validators = [this.validator, ...validators];
  }

  startsFromUpperCase() {
    const validator = (value) => {
      if (value.length > 0 && /^[a-zA-Z]/.test(value[0])) {
        if (value[0] === value[0].toUpperCase()) {
          return true;
        }
        return false;
      }
      return false;
    };
    return new StringSchema([...this.validators, validator]);
  }

  length(len) {
    const validator = (value) => {
      if (value.length === len) {
        return true;
      }
      return false;
    };
    return new StringSchema([...this.validators, validator]);
  }

  hasExclamation() {
    const validator = (value) => {
      if (value[value.length - 1] === '!') {
        return true;
      } return false;
    };
    return new StringSchema([...this.validators, validator]);
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }
}

export default StringSchema;
