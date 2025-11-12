import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const enrollUserInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/enrollments/${courseId}`
  );
  return response.data;
};

export const unenrollUserFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/current/enrollments/${courseId}`
  );
  return response.data;
};

export const findEnrollmentsForUser = async () => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

export const enrollUserInCourseByFaculty = async (
  courseId: string,
  userId: string
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/users/${userId}/enroll`
  );
  return response.data;
};
