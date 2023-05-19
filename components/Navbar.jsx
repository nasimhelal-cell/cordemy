import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";

const Navbar = () => {
  const { pathname } = useRouter();
  return (
    <div className="h-20 bg-gray-950 text-gray-300 flex justify-center items-center">
      <div className="wrapper font-bold flex justify-between items-center text-lg">
        <Link href="/" className="text-2xl">
          Cordemy
        </Link>
        <div className="flex justify-between gap-5 items-center">
          <Link className={pathname === "/" ? "active" : null} href="/">
            Home
          </Link>
          <Link
            className={pathname === "/courses" ? "active" : null}
            href="/courses"
          >
            courses
          </Link>
          <Link
            className={pathname === "/about" ? "active" : null}
            href="/about"
          >
            about
          </Link>
          <Link
            className={pathname === "/contact" ? "active" : null}
            href="/contact"
          >
            contact
          </Link>
        </div>
        <div>
          <Button
            href="/users/login"
            placeholder="Sign in"
            color="secondary"
            size="default"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
