import { Outlet, useNavigation, Navigation } from "react-router-dom";
import React from "react";

const RootLayout: React.FC = () => {
  const navigation: Navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && <p>Loading...</p>}
      <Outlet />
    </>
  );
};

export default RootLayout;
