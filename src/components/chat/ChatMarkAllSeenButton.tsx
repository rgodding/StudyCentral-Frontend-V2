import { useMutation } from "@tanstack/react-query";

import { StudyButton, type StudyButtonProps } from "@/components/ui";
import { chatApi } from "@/api/chatApi";

type ChatMarkAllSeenButtonProps = Omit<
  StudyButtonProps,
  "children" | "loading" | "onClick" | "type"
> & {
  onMarkedAllSeen?: () => Promise<void> | void;
};

const chatMarkAllSeenButtonText = {
  label: "Mark all as read",
};

export function ChatMarkAllSeenButton({
  onMarkedAllSeen,
  ...props
}: ChatMarkAllSeenButtonProps) {
  const markAllSeenMutation = useMutation({
    mutationFn: () => chatApi.markAllSeen(),

    onSuccess: async () => {
      await onMarkedAllSeen?.();
    },
  });

  return (
    <StudyButton
      type="button"
      size="xs"
      variant="secondary"
      loading={markAllSeenMutation.isPending}
      onClick={() => markAllSeenMutation.mutate()}
      {...props}
    >
      {chatMarkAllSeenButtonText.label}
    </StudyButton>
  );
}