/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
class ArraySchema {
  validator = (value) => Array.isArray(value);

  constructor(validators = []) {
    this.validators = [this.validator, ...validators];
  }

  maxDepth(depth) {
    const validator = (value) => {
      const check = (checkValue, checkDepth) => {
        if (!Array.isArray(checkValue)) return true;
        if (checkDepth < 0) return false;
        return checkValue.reduce((acc, el) => acc && check(el, checkDepth - 1), true);
      };
      return check(value, depth);
    };
    return new ArraySchema([...this.validators, validator]);
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }
}

export default ArraySchema;
