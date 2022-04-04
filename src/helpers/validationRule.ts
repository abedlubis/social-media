import * as yup from 'yup';

const required = yup.string().required('This field is required');

const requiredEmail = yup.string()
  .email('This field is not an email')
  .required('This field is required');

const maxChar = (max: number) => yup
  .string()
  .max(max, `This field must be ${max} characters or fewer`)
  .required('This field is required');

export const POST_CONFIG_VALIDATION_RULES = yup.object().shape({
  post_title: maxChar(100),
  post_body: maxChar(250),
});

export const COMMENT_CONFIG_VALIDATION_RULES = yup.object().shape({
  comment_name: required,
  comment_email: requiredEmail,
  comment_body: maxChar(250),
});
