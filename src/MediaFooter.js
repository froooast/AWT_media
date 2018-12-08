import React, { Component } from "react";
import { Box, Footer, Label, SocialShare } from "grommet";

/*
 * Customized Footer component to wrap the app in
 */
class MediaFooter extends Component {
  render() {
    return (
      <Footer
        direction="row"
        justify="between"
        separator="top"
        pad={{ horizontal: "small", vertical: "small" }}
      >
        <Label>2018 © bDash</Label>
        <Box direction="row">
          <SocialShare type="facebook" link={"https://www.google.de/"} />
          <SocialShare type="twitter" link={"https://www.google.de/"} />
          <SocialShare type="linkedin" link={"https://www.google.de/"} />
        </Box>
        <Box>
          <span>Blockchain-based Player</span>
        </Box>
      </Footer>
    );
  }
}

export default MediaFooter;
