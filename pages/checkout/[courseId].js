import SectionHeader from "@/components/SectionHeader";
import { getCourse } from "@/prisma/courses";
import { currencyConverter } from "@/utils/currencyConverter";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CheckOut = ({ course }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    courseTitle: course.title,
    coursePrice: course.price,
  });

  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name,
        email: session.user.email,
      }));
    }
  }, [session]);
  const handleCheckOut = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="wrapper py-10 min-h-screen">
      <SectionHeader
        span="Checkout"
        h2="Please provide your details"
        p="Fill up the form to continue"
      />
      <div>
        <form
          onSubmit={handleCheckOut}
          className="flex form-data flex-col gap-5 mt-10 w-full lg:w-[35rem] mx-auto"
        >
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="name" className="cursor-pointer font-semibold">
              Name:
            </label>
            <input
              className="outline-0 border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="name"
              placeholder="Nasim"
              value={formData.name}
              readOnly
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              className="outline-0 border py-3 px-4 rounded-lg focus:border-gray-700"
              type="email"
              id="email"
              placeholder="example@example.com"
              value={formData.email}
              readOnly
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer font-semibold" htmlFor="mobile">
              Mobile:
            </label>
            <input
              className="outline-0 border py-3 px-4 rounded-lg focus:border-gray-700"
              type="tel"
              id="mobile"
              placeholder="+8801xxx-xx-xx-xx"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="cursor-pointer font-semibold" htmlFor="address">
              Adress:
            </label>
            <input
              className="outline-0 border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="address"
              placeholder="ABC road, XYZ"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label
              className="cursor-pointer font-semibold"
              htmlFor="courseTitle"
            >
              Course title:
            </label>
            <input
              className="outline-0 border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="courseTitle"
              placeholder="Advanced course"
              value={formData.courseTitle}
              readOnly
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label
              className="cursor-pointer font-semibold"
              htmlFor="coursePrice"
            >
              Course Price(USD)
            </label>
            <input
              className="outline-0 border py-3 px-4 rounded-lg focus:border-gray-700"
              type="number"
              id="coursePrice"
              placeholder="$ xxx"
              value={formData.coursePrice}
              readOnly
            />
          </div>
          <button
            className="bg-black py-4 rounded-lg text-white text-lg hover:text-gray-50 hover:bg-gray-800"
            type="submit"
            role="link"
          >
            Proceed to CheckOut
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
export const getServerSideProps = async (context) => {
  const course = await getCourse(context.query.courseId);

  const updatedCourse = {
    ...course,
    updatedAt: course.updatedAt.toString(),
    createdAt: course.createdAt.toString(),
  };
  return {
    props: {
      course: updatedCourse,
    },
  };
};
