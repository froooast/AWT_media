import React, { Component } from "react";
import { AccountData } from "drizzle-react-components";
import logo from "../../logo.png";

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <h1>Drizzle Examples</h1>
            <p>
              Examples of how to get started with Drizzle in various situations.
            </p>

            <br />
            <br />
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br />
            <br />
          </div>

          <div className="pure-u-1-1">
            <h2>SimpleStorage</h2>
            <p>
              This shows a simple ContractData component with no arguments,
              along with a form to set its value.
            </p>

            <div className="pure-u-1-1">
              <h2>ComplexStorage</h2>
              <p>
                Finally this contract shows data types with additional
                considerations. Note in the code the strings below are converted
                from bytes to UTF-8 strings and the device data struct is
                iterated as a list.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
