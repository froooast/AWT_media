import React, { Component } from "react";
import { Header, Image, Menu, Title } from "grommet";
import logo from "../src/logo.png";
/*
 * Customized Header component to wrap the app in
 */

class MediaHeader extends Component {
  render() {
    return (
      <Header
        fixed={true}
        direction={"row"}
        align={"end"}
        justify="between"
        separator="bottom"
        pad={{ horizontal: "small" }}
      >
        <Title>
          <Image src={logo} alt="logo" size="thumb" />
          bDash
        </Title>
        <Menu direction={"row"}>video</Menu>
      </Header>
    );
  }
}

export default MediaHeader;
