import Image from "next/image";
import Link from "next/link";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <>
      <header className="bg-primary w-full">
        <div className="container mx-auto flex py-8  items-center justify-center">
          <Link href="https://olympics.com/en/paris-2024" target="_blank">
            <Image
              src={require("../../../public/olympics-lg.svg")}
              alt="Olympics logo"
              width={100.9}
              height={116}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
