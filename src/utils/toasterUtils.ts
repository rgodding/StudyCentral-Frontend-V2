import {
  LuCircleAlert,
  LuCircleCheck,
  LuCircleX,
  LuInfo,
} from "react-icons/lu";

export type StudyToastType = "success" | "error" | "warning" | "info" | string;

export function getToastBackgroundColor(type?: StudyToastType) {
  switch (type) {
    case "success":
      return "green.200";
    case "error":
      return "red.400";
    case "warning":
      return "yellow.400";
    case "info":
      return "blue.300";
    default:
      return "surfaceBg";
  }
}

export function getToastBorderColor(type?: StudyToastType) {
  switch (type) {
    case "success":
      return "green.700";
    case "error":
      return "red.700";
    case "warning":
      return "yellow.700";
    case "info":
      return "blue.700";
    default:
      return "borderSubtle";
  }
}

export function getToastIndicatorColor(type?: StudyToastType) {
  switch (type) {
    case "success":
      return "successText";
    case "error":
      return "dangerText";
    case "warning":
      return "warningText";
    case "info":
      return "accent";
    default:
      return "textMuted";
  }
}

export const getToastIcon = (type?: string) => {
  switch (type) {
    case "success":
      return LuCircleCheck;
    case "error":
      return LuCircleX;
    case "warning":
      return LuCircleAlert;
    case "info":
      return LuInfo;
    default:
      return LuInfo;
  }
}