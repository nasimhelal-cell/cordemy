import { getCourse } from "@/prisma/courses";
import { currencyConverter } from "@/utils/currencyConverter";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CourseDetailPage = ({ course }) => {
  const { data: session } = useSession();
  const route = useRouter();
  const handleEnroll = () => {
    if (session) {
      route.push(`checkout/${course.id}`);
    } else {
      route.push(`/users/login?destination=/checkout/${course.id}`);
    }
  };
  return (
    <div className="wrapper py-10">
      <div
        style={{ backgroundImage: `url(${course.cover})` }}
        className="w-full h-[40rem] bg-no-repeat bg-center bg-cover"
      ></div>
      <div className="mt-10 grid lg:grid-cols-2 gap-3 lg:gap-10 space-y-2 lg:space-y-0">
        <div className="space-y-2 text-lg">
          <h2 className="text-3xl">{course.title}</h2>
          <p>
            <span className="font-semibold">Instructor: </span>
            {course.instructor}
          </p>
          <p className="lg:w-[80%]">
            <span className="font-semibold">Description: </span>
            {course.description}
          </p>
          <p>
            <span className="font-semibold">Enrolled: </span>
            {course.students}
          </p>
        </div>
        <div className="space-y-2 text-lg">
          <p>
            <span className="font-semibold">Duration: </span>
            {course.duration}
          </p>
          <p>
            <span className="font-semibold">Rating: </span> {course.rating}
          </p>
          <p className="text-2xl font-semibold">
            <span className="font-semibold ">Price: </span>
            {currencyConverter(course.price)}
          </p>
          <button
            onClick={handleEnroll}
            className="bg-black text-white py-3 w-full rounded-lg hover:bg-gray-800 duration-300"
          >
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

//server side

export const getServerSideProps = async ({ query }) => {
  const course = await getCourse(query.courseId);
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
