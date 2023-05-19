import CourseItem from "@/components/CourseItem";
import SectionHeader from "@/components/SectionHeader";
import { getAllCourses } from "@/prisma/courses";
const span = "Courses";
const h2 = "Browse all courses";
const p =
  "Learn new skills, grow your knowledge, and advance your career with our wide selection of online courses. Whether you are a beginner or an expert, we have something for everyone.";
const CoursePage = ({ courses }) => {
  return (
    <div className="wrapper py-3">
      <SectionHeader span={span} h2={h2} p={p} />
      <div className="mt-10 flex flex-wrap gap-10">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;

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
