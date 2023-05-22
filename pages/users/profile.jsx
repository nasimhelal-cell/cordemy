import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";

//component function
const Profile = ({ session }) => {
  const route = useRouter();

  //logout functionality
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
  }, [route, session]);

  if (!session) return null;
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <Image
        src={session.user.image}
        width={100}
        height={100}
        className="rounded-full outline outline-blue-500 outline-offset-4"
        alt={session.user.name}
      />
      <h2 className="text-3xl font-semibold mt-3">
        Welcome, {session.user.name}
      </h2>
      <h3>{session.user.email}</h3>
      <div className="flex justify-center">
        <button
          className="flex gap-2 items-center bg-rose-600 text-white py-3 px-6 rounded-full mt-10 hover:bg-rose-500 duration-300"
          onClick={LogOut}
        >
          <span>
            <FiLogOut />
          </span>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/users/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
