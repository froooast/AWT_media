import Home from "./Home";
import { drizzleConnect } from "drizzle-react";

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    Media: state.contracts.Media,
    accounts: state.accounts
  };
};

const HomeContainer = drizzleConnect(Home, mapStateToProps);

export default HomeContainer;
