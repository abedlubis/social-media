import React, { FC, memo } from 'react';
import { Grid, Input } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

interface IInputWithValidationProps {
  label: string;
  value: string | number;
  defaultColumn: 2 | 3;
  name: string;
  type: string;
  errorMessage?: string;
  min?: number;
  max?: number;
  id?: string;
  guide?: string;
  fluid?: boolean;
  placeholder?: string;
  disabled?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const renderGuide = (guide: string) => {
  if (guide.trim()) {
    return <div className="pad-left-child">{guide}</div>;
  }
  return null;
};

const InputWithValidation: FC<IInputWithValidationProps> = (
  {
    defaultColumn,
    label,
    fluid,
    guide,
    value,
    handleChange,
    name,
    disabled,
    type,
    placeholder,
    id,
    min,
    max,
    errorMessage,
  },
) => (
  <Grid>
    <Grid.Row columns={defaultColumn} verticalAlign="top">
      <Grid.Column className="pad-left" width={7}>
        <label className="pt-10" htmlFor={id}>{label}</label>
        {renderGuide(guide || '')}
      </Grid.Column>
      <Grid.Column width={9}>
        <Input
          error={!!errorMessage}
          fluid={fluid}
          value={value}
          name={name}
          onChange={handleChange}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          id={id}
          min={min}
          max={max}
        />
        <ErrorMessage message={errorMessage || ''} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

InputWithValidation.defaultProps = {
  errorMessage: '',
  min: 0,
  max: Infinity,
  id: '',
  guide: '',
  fluid: true,
  placeholder: '',
  disabled: false,
};

export default memo(InputWithValidation);
