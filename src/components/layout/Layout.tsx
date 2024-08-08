import { PropsWithChildren } from "react";
import Main from "../templates/Main";
import Header from "../templates/Header";
import Nav from "../templates/Nav";

type LayoutProps = PropsWithChildren;

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen">
      <Header />
      <Main>
        <Nav />
        {children}
      </Main>
    </div>
  );
};

export default Layout;
