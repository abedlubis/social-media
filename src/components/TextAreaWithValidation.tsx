import React, { FC, memo } from 'react';
import { Grid, TextArea } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

interface ITextareaWithValidationProps {
  label: string;
  value: string | number;
  defaultColumn: 2 | 3;
  name: string;
  maxlength?: number;
  rows?: number;
  errorMessage?: string;
  id?: string;
  guide?: string;
  placeholder?: string;
  disabled?: boolean;
  handleChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
}

const renderGuide = (guide: string) => {
  if (guide.trim()) {
    return <div className="pad-left-child">{guide}</div>;
  }
  return null;
};

const TextareaWithValidation: FC<ITextareaWithValidationProps> = (
  {
    label,
    value,
    defaultColumn,
    name,
    rows,
    errorMessage,
    id,
    maxlength,
    guide,
    placeholder,
    disabled,
    handleChange,
  },
) => (
  <Grid>
    <Grid.Row columns={defaultColumn} verticalAlign="middle">
      <Grid.Column className="pad-left" width={7}>
        <label className="pt-10" htmlFor={id}>{label}</label>
        {renderGuide(guide || '')}
      </Grid.Column>
      <Grid.Column width={9}>
        <TextArea
          className={errorMessage ? 'inputTextArea error-textarea' : 'inputTextArea'}
          maxLength={maxlength}
          name={name}
          value={value}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          onChange={handleChange}
        />
        <ErrorMessage message={errorMessage || ''} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

TextareaWithValidation.defaultProps = {
  maxlength: Infinity,
  rows: 3,
  errorMessage: '',
  id: '',
  guide: '',
  placeholder: '',
  disabled: false,
};

export default memo(TextareaWithValidation);
