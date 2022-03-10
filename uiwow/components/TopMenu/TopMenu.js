import { Menu, Header, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import Image from "next/image";
import { useClient } from "../../hooks";
import FormSearch from "../FormSearch/FormSearch";
import style from "./TopMenu.module.css";

export function TopMenu(props) {
  const { siteLogoUrl, headerMenuItems, siteTitle, siteDescription } = props;
  const { cart } = useClient();

  return (
    <Menu stackable style={{ minWidth: "100%", width: "100%" }}>
      <Link href="/">
        <Menu.Item header>
          <Image
            src={siteLogoUrl}
            width={25}
            height={25}
            floating="left"
            className={style.topMenuImage}
          />
          <Header size="small" className={style.topMenuBrand}>
            <Header.Content>
              {siteTitle}
              <Header.Subheader>{siteDescription}</Header.Subheader>
            </Header.Content>
          </Header>
        </Menu.Item>
      </Link>

      {!!headerMenuItems &&
        headerMenuItems?.map((item) => (
          <Link key={item.ID} href={item.url}>
            <Menu.Item name={item.title} />
          </Link>
        ))}

      <Menu.Menu position="right">
        <Menu.Item>
          <FormSearch />
        </Menu.Item>
        <Link href="/cart">
          <Menu.Item>
            <Icon
              name={cart?.totalQty ? "cart" : "opencart"}
              color={cart?.totalQty && "blue"}
            />
            {cart?.totalQty && (
              <Label
                className="top-menu-cart-label"
                floating
                circular
                basic
                color="green"
                size="tiny"
              >
                {cart.cartItems?.length}
              </Label>
            )}
          </Menu.Item>
        </Link>
        <Link href="#">
          <Menu.Item>
            <Icon name="sign in" />
            Ingresar
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
