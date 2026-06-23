import { useMutation, useQueryClient } from "@tanstack/react-query";

import { accountApi } from "@/api/accountApi";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import type { ChangePasswordDto, UpdateUserDto } from "@/types/api";
import { useStudyToast } from "@/components/feedback";

export function useAccountPage() {
  const queryClient = useQueryClient();
  const toast = useStudyToast();
  const currentUserQuery = useCurrentUser();

  const invalidateCurrentUser = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["account", "me"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["auth", "currentUser"],
      }),
    ]);
  };

  const updateProfileMutation = useMutation({
    mutationFn: (dto: UpdateUserDto) => accountApi.updateCurrentUser(dto),

    onSuccess: async () => {
      await invalidateCurrentUser();

      toast.success({
        title: "Profile updated",
      });
    },

    onError: (error) => {
      console.error(error);

      toast.error({
        title: "Could not update profile",
      });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (dto: ChangePasswordDto) => accountApi.changePassword(dto),

    onSuccess: () => {
      toast.success({
        title: "Password changed",
      });
    },

    onError: (error) => {
      console.error(error);

      toast.error({
        title: "Could not change password",
      });
    },
  });

  const uploadProfilePictureMutation = useMutation({
    mutationFn: (file: File) => accountApi.uploadProfilePicture(file),

    onSuccess: async () => {
      await invalidateCurrentUser();

      toast.success({
        title: "Profile picture updated",
      });
    },

    onError: (error) => {
      console.error(error);

      toast.error({
        title: "Could not upload profile picture",
      });
    },
  });

  const deleteProfilePictureMutation = useMutation({
    mutationFn: () => accountApi.deleteProfilePicture(),

    onSuccess: async () => {
      await invalidateCurrentUser();

      toast.success({
        title: "Profile picture removed",
      });
    },

    onError: (error) => {
      console.error(error);

      toast.error({
        title: "Could not remove profile picture",
      });
    },
  });

  return {
    user: currentUserQuery.data,
    isLoading: currentUserQuery.isLoading,
    isError: currentUserQuery.isError,

    updateProfile: updateProfileMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    uploadProfilePicture: uploadProfilePictureMutation.mutate,
    deleteProfilePicture: deleteProfilePictureMutation.mutate,

    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isUploadingProfilePicture: uploadProfilePictureMutation.isPending,
    isDeletingProfilePicture: deleteProfilePictureMutation.isPending,
  };
}