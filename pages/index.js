import { getAllCourses } from "@/prisma/courses";
import CoursePage from "./courses";

const HomePage = ({ courses }) => {
  return (
    <div className="wrapper">
      <CoursePage courses={courses} />
    </div>
  );
};

export default HomePage;

//server side codes
export const getServerSideProps = async () => {
  const courses = await getAllCourses();

  const updatedCourses = courses.map((course) => ({
    ...course,
    updatedAt: course.updatedAt.toString(),
    createdAt: course.createdAt.toString(),
  }));
  return {
    props: {
      courses: updatedCourses,
    },
  };
};
