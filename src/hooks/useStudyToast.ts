import { studyToaster } from "@/components/feedback/studyToasterInstance";

type StudyToastOptions = {
  title: string;
  description?: string;
  duration?: number;
};

export function useStudyToast() {
  function success(options: StudyToastOptions) {
    studyToaster.create({
      type: "success",
      title: options.title,
      description: options.description,
      duration: options.duration ?? 4000,
      closable: true,
    });
  }

  function error(options: StudyToastOptions) {
    studyToaster.create({
      type: "error",
      title: options.title,
      description: options.description,
      duration: options.duration ?? 5000,
      closable: true,
    });
  }

  function warning(options: StudyToastOptions) {
    studyToaster.create({
      type: "warning",
      title: options.title,
      description: options.description,
      duration: options.duration ?? 4500,
      closable: true,
    });
  }

  function info(options: StudyToastOptions) {
    studyToaster.create({
      type: "info",
      title: options.title,
      description: options.description,
      duration: options.duration ?? 4000,
      closable: true,
    });
  }

  return {
    success,
    error,
    warning,
    info,
  };
}
