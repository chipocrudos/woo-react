import { useState } from "react";
import { Button, Container, Grid, Header, Icon, Menu } from "semantic-ui-react";
import Link from "next/link";

export function Footer(props) {
  const { header, footer } = props;

  return (
    <div>
      <Container
        fluid
        style={{ width: "90%", marginTop: "20px", left: "15%", rigth: "15%" }}
      >
        <Grid divided>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header as="h2"></Header>

              <Menu text vertical>
                <Menu.Item header>{header.siteTitle}</Menu.Item>

                {footer.footerMenuItems?.map((item) => {
                  return (
                    <Link key={item.ID} href={item.url}>
                      <Menu.Item name={item.title} />
                    </Link>
                  );
                })}
              </Menu>
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={4}>
            <Grid.Column textAlign="center">
              <div>
                {footer.socialLinks?.map((item, index) => {
                  return (
                    <Link key={index} href={item.iconUrl}>
                      <Button
                        color={item.iconName}
                        style={{ marginTop: "2px" }}
                      >
                        <Icon name={item.iconName} />
                        {item.iconName.replace(/^\w/, (c) => c.toUpperCase())}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </Grid.Column>
          </Grid.Row>
          {!!footer?.copyrightText && (
            <Grid.Row centered columns={4}>
              <Grid.Column>
                <Header>{footer?.copyrightText}</Header>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Container>
    </div>
  );
}
