import React, { FC, memo } from 'react';
import {
  Modal,
  Button,
  Icon,
}
  from 'semantic-ui-react';

interface IModalWrapperProps {
  headerText: string;
  closeIcon: boolean;
  basic: boolean;
  open: boolean;
  useModalAction: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
  onClose?: (event: React.SyntheticEvent, data: object) => void;
  onOpen?: (event: React.SyntheticEvent, data: object) => void;
  onMount?: () => void;
  onUnmount?: () => void;
  onClickYes?: () => void;
}

const ModalWrapper: FC<IModalWrapperProps> = (props) => {
  const {
    headerText,
    basic,
    closeIcon,
    useModalAction,
    open,
    onClose,
    onOpen,
    onClickYes,
    onMount,
    onUnmount,
  } = props;

  const renderModalActions = () => {
    if (useModalAction) {
      return (
        <Modal.Actions>
          <Button basic color="red" onClick={onClose}>
            <Icon name="remove" />
            {' '}
            No
          </Button>
          <Button color="green" inverted onClick={onClickYes}>
            <Icon name="checkmark" />
            {' '}
            Yes
          </Button>
        </Modal.Actions>
      );
    }
    return null;
  };

  return (
    <Modal
      basic={basic}
      closeIcon={closeIcon}
      dimmer
      open={open}
      size="small"
      closeOnDimmerClick={false}
      onUnmount={onUnmount}
      onClose={onClose}
      onMount={onMount}
      onOpen={onOpen}
    >
      <Modal.Header>{headerText}</Modal.Header>
      <Modal.Content>
        {props.children}
      </Modal.Content>

      {renderModalActions()}
    </Modal>
  );
};

export default memo(ModalWrapper);
