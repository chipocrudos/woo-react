import { Grid, Message } from "semantic-ui-react";

export function CenterMessage(props) {
  const { header, content, color } = props;

  return (
    <Grid>
      <Grid.Row centered columns={2}>
        <Grid.Column>
          <Message color={color} icon="x" header={header} content={content} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

Message.defaultProps = {
  color: "red",
  header: "",
  content: "Escriba su mensaje",
};
