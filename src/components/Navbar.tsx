import React, { FC, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Menu,
  Icon,
} from 'semantic-ui-react';
import {
  setSidebarVisible,
} from '../redux/actions/app';
import { TAppState } from '../redux';

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const {
    isSidebarVisible,
  } = useSelector((state: TAppState) => state.app);

  const onClickMenubars = useCallback(() => {
    dispatch(setSidebarVisible(!isSidebarVisible));
  }, [isSidebarVisible]);

  return (
    <Menu inverted>
      <Container>
        <Menu.Item onClick={onClickMenubars}>
          <Icon name="bars" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default memo(Navbar);
