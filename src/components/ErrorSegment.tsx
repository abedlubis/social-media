import React, { FC } from 'react';
import {
  Segment,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';

interface IErrorSegmentProps {
  title: string;
  desc: string;
}

const ErrorSegment: FC<IErrorSegmentProps> = (props) => {
  const {
    title,
    desc,
  } = props;

  return (
    <Container>
      <Segment raised padded>
        <Header as="h2" icon textAlign="center">
          <Icon name="exclamation triangle" circular />
          <Header.Content>{title}</Header.Content>
        </Header>
        <Header textAlign="center">
          <Header.Subheader>{desc}</Header.Subheader>
        </Header>
      </Segment>
    </Container>
  );
};

export default ErrorSegment;
