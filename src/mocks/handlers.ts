import { http, HttpResponse } from "msw";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const handlers = [
  http.get(`${API_BASE_URL}/api/account/me`, () => {
    return HttpResponse.json({
      id: "33333333-3333-3333-3333-333333333333",
      email: "student@test.com",
      firstName: "Test",
      lastName: "Student",
      role: "Student",
      profilePictureUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }),

  http.get(`${API_BASE_URL}/api/student/courses`, () => {
    return HttpResponse.json([
      {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        name: "Software Development",
        description: "Mock course for frontend development.",
        teacherFirstName: "Test",
        teacherLastName: "Teacher",
        studentCount: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  }),

  http.get(`${API_BASE_URL}/api/teacher/courses`, () => {
    return HttpResponse.json([
      {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        name: "Software Development",
        description: "Mock course for frontend development.",
        teacherFirstName: "Test",
        teacherLastName: "Teacher",
        studentCount: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  }),
];