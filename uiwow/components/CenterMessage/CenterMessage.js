import { Grid, Message } from "semantic-ui-react";

export function CenterMessage(props) {
  const { header, content, color, icon, columns, messageType } = props;

  return (
    <Grid>
      <Grid.Row centered columns={columns}>
        <Grid.Column>
          <Message
            color={color}
            icon={icon}
            header={header}
            content={content}
            className={messageType}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

Message.defaultProps = {
  color: "",
  messageType: "",
  header: "",
  icon: "x",
  columns: 2,
  content: "Escriba su mensaje",
};
