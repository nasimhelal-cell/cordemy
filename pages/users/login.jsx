import SectionHeader from "@/components/SectionHeader";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = ({ session }) => {
  const route = useRouter(); // Router
  const SignInWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (session) {
      const destinaton = route.query.destination || "/users/profile";
      route.replace(destinaton);
    }
  }, [route, session]);

  if (session) {
    return null; // because no need to navigate this page as already logged in
  }

  if (!session) {
    return (
      <div className="min-h-screen py-10">
        <SectionHeader
          span={"Login"}
          h2={"Get started with Google"}
          p={"Please login to continue with our features!"}
        />
        <div className="flex justify-center">
          <button
            className="flex gap-2 items-center bg-blue-600 text-white py-3 px-6 rounded-full mt-10 hover:bg-blue-700 duration-300"
            onClick={SignInWithGoogle}
          >
            <span>
              <FcGoogle />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
};

export default LoginPage;

/// Server side codes to return session

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const destination = context.query.destination || "/users/profile";
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }
  //only return session
  return {
    props: {
      session,
    },
  };
};
