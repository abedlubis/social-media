import React, {
  FC, useCallback, useState, useMemo, useEffect, memo,
} from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useParams } from 'react-router';
import { Prompt } from 'react-router-dom';
import {
  Segment,
  Container,
  Header,
  Grid,
  Divider,
  Button,
} from 'semantic-ui-react';
import { TAppState } from '../../redux';
import { IPostParams } from '../../interfaces/post';
import { POST_FORM } from '../../constants';
import {
  setPostForm,
  setPostFormErrors,
  resetState,
} from '../../redux/actions/postConfig';
import {
  createUserPost,
  getUserPost,
  updateUserPost,
} from '../../actions/postConfig';
import { deepCopy } from '../../utils';
import Validator from '../../helpers/Validator';
import { POST_CONFIG_VALIDATION_RULES } from '../../helpers/validationRule';
import FormWrapper from '../../components/FormWrapper';

const PostConfig: FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const { postId, userId } = useParams<IPostParams>();
  const {
    errors,
    form,
    formDefault,
    isLoading,
  } = useSelector((state: TAppState) => state.postConfig);

  const isNewPostProcess = useMemo(() => !!userId, [userId]);

  const [isEditMode, setIsEditMode] = useState<boolean>(!!isNewPostProcess);

  useEffect(() => {
    if (!isNewPostProcess) {
      dispatch(getUserPost(postId));
    }
    return () => {
      dispatch(resetState());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    const newForm: any= deepCopy(form);
    newForm[name] = value;

    dispatch(setPostForm(newForm));
  };

  const handleChangeTextArea = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;

    const newForm: any= deepCopy(form);
    newForm[name] = value;

    dispatch(setPostForm(newForm));
  };

  const handleSave = useCallback(() => {
    const validator = new Validator(POST_CONFIG_VALIDATION_RULES);
    validator.validate(form)
      .then(() => {
        if (isNewPostProcess) {
          batch(() => {
            dispatch(setPostFormErrors({}));
            dispatch(createUserPost(userId));
          });
        } else {
          batch(() => {
            dispatch(setPostFormErrors({}));
            dispatch(updateUserPost(postId));
          });
        }
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        dispatch(setPostFormErrors(errorMessages));
      });
  }, [form, userId, postId]);

  const handleCancel = useCallback(() => {
    if (isNewPostProcess) {
      props.history.push(`/posts/${userId}`);
      return;
    }

    setIsEditMode(false);
    batch(() => {
      dispatch(setPostForm(formDefault));
      dispatch(setPostFormErrors({}));
    });
  }, [isNewPostProcess, formDefault]);

  const renderButton = useCallback(() => {
    if (isEditMode || isNewPostProcess) {
      return (
        <div className="pull-right">
          <Button
            id="btn-cancel"
            size="medium"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id="btn-save"
            size="medium"
            color="teal"
            className="ml-8"
            disabled={!isEditMode}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      );
    }
    return (
      <div className="pull-right">
        <Button
          color="teal"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </Button>
      </div>
    );
  }, [isEditMode, handleCancel, handleSave]);

  return (
    <Container>
      <Segment raised padded loading={isLoading}>
        <Grid verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                { isNewPostProcess ? `New Post (User: ${userId})` : `Edit Post #${postId}`}
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Divider />

          <Grid.Row>
            <Grid.Column>
              {renderButton()}
            </Grid.Column>
          </Grid.Row>

          <FormWrapper
            disabled={!isEditMode}
            formField={POST_FORM}
            form={form}
            errors={errors}
            handleChange={handleChange}
            handleChangeTextArea={handleChangeTextArea}
          />
        </Grid>
      </Segment>
      <Prompt
        when={isEditMode && !isNewPostProcess}
        message="Are you sure want to leave ?"
      />
    </Container>
  );
};

export default memo(PostConfig);
