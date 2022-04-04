import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  Sidebar,
} from 'semantic-ui-react';
import { TAppState } from '../redux';
import SidebarMenu from './SidebarMenu';
import Navbar from './Navbar';
import { EStatusErrorCode } from '../interfaces';
import ErrorSegment from './ErrorSegment';

const ContainerWrapper: FC = (props) => {
  const {
    errorStatus,
  } = useSelector((state: TAppState) => state.app);

  const renderChildren = () => {
    if (errorStatus && errorStatus === EStatusErrorCode.RATE_LIMITER) {
      return (
        <ErrorSegment
          title="High Traffic"
          desc="Sorry, please try again later we are busy now"
        />
      );
    }

    if (errorStatus && errorStatus === EStatusErrorCode.GENERAL_ERROR) {
      return (
        <ErrorSegment
          title="Technical Error"
          desc="Sorry, please try again there's a technical issue"
        />
      );
    }

    if (errorStatus && errorStatus === EStatusErrorCode.NOT_FOUND) {
      return (
        <ErrorSegment
          title="404 Not Found"
          desc="Sorry, please try again later"
        />
      );
    }
    return props.children;
  };

  return (
    <Sidebar.Pushable className="sidebar-container">
      <SidebarMenu />
      <Sidebar.Pusher>
        <Navbar />
        {renderChildren()}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default ContainerWrapper;
