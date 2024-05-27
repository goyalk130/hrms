import React from "react";
import App from "./Menu/Menu";
import Sider from "antd/es/layout/Sider";
import cn from "../util/cn";

const SideBar = ({ collapsed }) => {
  return (
    <Sider
      collapsed={collapsed}
      width={250}
      className="w-96 !bg-base !h-screen"
    >
      <div className="text-primary h-screen flex flex-col gap-3">
        <div>
          <h1
            className={cn(
              "italic  font-bold pt-3 capitalize flex w-full text-center justify-center",
              { "text-5xl": !collapsed, "test-xl": collapsed }
            )}
          >
            RAI
          </h1>
        </div>
        <App />
      </div>
    </Sider>
  );
};

export default SideBar;
