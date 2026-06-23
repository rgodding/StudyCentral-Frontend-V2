import { chatApiRoutes } from "@/config/apiRoutes/chatApiRoutes";
import { accountApiRoutes } from "./accountApiRoutes";
import { authApiRoutes } from "./authApiRoutes";
import { fileApiRoutes } from "./fileApiRoutes";
import { imageApiRoutes } from "./imageApiRoutes";
import { studentApiRoutes } from "./studentApiRoutes";
import { teacherApiRoutes } from "./teacherApiRoutes";

export const apiRoutes = {
  auth: authApiRoutes,
  account: accountApiRoutes,
  files: fileApiRoutes,
  images: imageApiRoutes,
  teacher: teacherApiRoutes,
  student: studentApiRoutes,
  chat: chatApiRoutes,
} as const;