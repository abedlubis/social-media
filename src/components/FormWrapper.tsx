import React, { FC, memo } from 'react';
import {
  Grid,
  Form,
} from 'semantic-ui-react';
import { IFormField } from '../interfaces';
import { IPostForm } from '../redux/types/postConfig';
import { ICommentForm } from '../redux/types/commentConfig';
import InputWithValidation from './InputValidation';
import TextareaWithValidation from './TextAreaWithValidation';

interface IFormWrapper {
  errors: { [key: string]: string };
  formField: IFormField[];
  form: IPostForm | ICommentForm | any;
  disabled: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTextArea: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
}
// this component is a big loop for looping a field Input
// SKELETON FIELD source look at constants/index.ts
const FormWrapper: FC<IFormWrapper> = (props) => {
  const {
    disabled,
    form,
    errors,
    formField,
    handleChangeTextArea,
    handleChange,
  } = props;

  const renderField = (field: IFormField, idx: number) => {
    if (field.type === 'text') {
      return (
        <InputWithValidation
          key={`${idx}-${field.key}`}
          defaultColumn={2}
          label={field.label}
          fluid
          id={field.label}
          guide={field.guide}
          value={form[field.key]}
          name={field.key}
          type="text"
          disabled={disabled}
          placeholder={field.placeholder}
          handleChange={handleChange}
          errorMessage={errors[field.key]}
        />
      );
    }
    if (field.type === 'textarea') {
      return (
        <Form>
          <TextareaWithValidation
            key={`${idx}-${field.key}`}
            defaultColumn={2}
            label={field.label}
            id={field.key}
            rows={field.rows}
            maxlength={field.maxlength}
            guide={field.guide}
            value={form[field.key]}
            name={field.key}
            disabled={disabled}
            placeholder={field.placeholder}
            handleChange={handleChangeTextArea}
            errorMessage={errors[field.key]}
          />
        </Form>
      );
    }
    return null;
  };

  const renderFields = () => formField.map((field, idx) => (
    <Grid.Row verticalAlign="top" key={`${idx}-${field.key}`}>
      <Grid.Column>
        {renderField(field, idx)}
      </Grid.Column>
    </Grid.Row>
  ));

  return (
    <Grid.Row>
      <Grid.Column width={9}>
        {renderFields()}
      </Grid.Column>
    </Grid.Row>
  );
};

export default memo(FormWrapper);
