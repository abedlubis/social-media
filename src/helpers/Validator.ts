import { ValidationError, Schema } from 'yup';
import { IPostForm } from '../redux/types/postConfig';

class Validator {
  public static getErrorMessages(err: ValidationError) {
    const errorMessages: any = {};
    const e: ValidationError[] = err.inner;

    for (let i = 0; i < e.length; i++) {
      errorMessages[e[i].path] = e[i].message;
    }
    return errorMessages;
  }

  private rules: Schema<any>;

  constructor(rules: Schema<any>) {
    this.rules = rules;
  }

  public validate(value: object)
    : Promise<IPostForm | ValidationError> {
    return this.rules.validate(value, {
      abortEarly: false,
    });
  }
}

export default Validator;
