import Link from "next/link";
import { signOut } from "next-auth/react";
import Button from "./Button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

const Navbar = () => {
  // <----------hooks start---------->
  //take session which is comes as data from useSession hook
  const { data: session } = useSession();
  //logout functionality
  //profile modal on top-right coner on navbar
  const [openModal, setopenModal] = useState("hidden opacity-0");
  //take route
  const { pathname } = useRouter();
  const route = useRouter();
  // <----------hooks end---------->

  const LogOut = async () => {
    try {
      await signOut("google");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (!session) {
      route.replace("/users/login");
    }
  }, [session, route]);

  //navigate to profile page functionality
  const goToProfile = () => {
    setopenModal("hidden opacity-0");
  };

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
          {!session ? (
            <Button
              href="/users/login"
              placeholder="Sign in"
              color="secondary"
              size="default"
            />
          ) : (
            <div className="relative">
              <Image
                onClick={() => setopenModal("visible opacity-1")}
                className="block rounded-full outline outline-2 outline-white outline-offset-2"
                src={session.user.image}
                width={35}
                height={35}
                alt={session.user.name}
              />
              <div
                className={`absolute flex flex-col gap-3 justify-center items-center top-[150%] right-0 w-[20rem] py-10 bg-gray-400 text-gray-950  font-medium z-50 rounded-md ${openModal}`}
              >
                <button
                  onClick={() => setopenModal("hidden opacity-0")}
                  className="absolute top-3 right-5"
                >
                  <RxCross2 />
                </button>
                <Image
                  className="block rounded-full outline outline-2 outline-white outline-offset-2"
                  src={session.user.image}
                  width={100}
                  height={100}
                  alt={session.user.name}
                />
                <h2 className="text-2xl">{session.user.name}</h2>
                <p>{session.user.email}</p>
                <div className="flex gap-5 items-center mt-5">
                  <Link
                    href={"/users/login"}
                    className="flex gap-2 items-center bg-gray-200 text-gray-900 py-3 px-6 rounded-full  hover:bg-rose-100 duration-300"
                    onClick={goToProfile}
                  >
                    Profile
                  </Link>
                  <button
                    className="flex gap-2 items-center bg-rose-600 text-white py-3 px-6 rounded-full  hover:bg-rose-500 duration-300"
                    onClick={LogOut}
                  >
                    <span>
                      <FiLogOut />
                    </span>
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
