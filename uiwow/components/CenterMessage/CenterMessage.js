import { Grid, Message } from "semantic-ui-react";

export function CenterMessage(props) {
  const { header, content, color, icon, columns, messagetype } = props;

  return (
    <Grid>
      <Grid.Row centered columns={columns}>
        <Grid.Column>
          <Message
            color={color}
            icon={icon}
            header={header}
            content={content}
            className={messagetype}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

Message.defaultProps = {
  color: "",
  messagetype: "",
  header: "",
  icon: "x",
  columns: 2,
  content: "Escriba su mensaje",
};
