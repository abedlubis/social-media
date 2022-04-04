import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Menu,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import { TAppState } from '../redux';
import { MENU_LIST } from '../constants';

const SidebarMenu: FC = () => {
  const {
    isSidebarVisible,
  } = useSelector((state: TAppState) => state.app);

  const renderMenus = () => MENU_LIST.map((item, index) => (
    <Menu.Item as={Link} to={item.to} key={index}>
      <Icon name={item.icon} />
      {item.title}
    </Menu.Item>
  ));

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      vertical
      visible={isSidebarVisible}
      inverted
      width="thin"
    >
      {renderMenus()}
    </Sidebar>
  );
};

export default memo(SidebarMenu);
