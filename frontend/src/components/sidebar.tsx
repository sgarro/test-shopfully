import React from "react";
import {
  Header,
  Icon,
  Menu,
  Sidebar,
  Divider,
} from "semantic-ui-react";

interface Props {
  visible: boolean;
  setVisible: (boolean) => void;
  flyers: ApiType.Flyer[];
}

const FavouritesSidebar = (props: Props) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      onHide={() => props.setVisible(false)}
      vertical
      visible={props.visible}
      width="wide"
    >
      <Header as="h2" icon>
        <Icon name="heart" />
        Favourites
        <Header sub>The list of your preferred flyers</Header>
      </Header>
      <Divider />
      {props.flyers.map((flyer) => {
        return (
          <Menu.Item
            style={{ textAlign: "left" }}
            key={`sidebar_Favourite_${flyer.id}`}
          >
            <span>
              <Icon name="heart" />
              {flyer.title}
            </span>
          </Menu.Item>
        );
      })}
    </Sidebar>
  );
};

export default FavouritesSidebar;
