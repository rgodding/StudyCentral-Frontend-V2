import {
  Box,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  type BoxProps,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { LuCamera, LuTrash2, LuUser } from "react-icons/lu";
import { z } from "zod";

import { EmptyState, ErrorState, LoadingState } from "@/components/feedback";
import { Section } from "@/components/layout";
import { StudyField, StudyInput } from "@/components/forms";
import {
  StudyAvatar,
  StudyBadge,
  StudyButton,
  StudyCard,
  StudyDivider,
  StudyHeading,
  StudyText,
} from "@/components/ui";
import { useAccountPage } from "@/hooks/account/useAccountPage";
import type { UserDto } from "@/types/api";
import { getImageUrl } from "@/utils";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Enter a valid email address."),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const defaultPasswordValues: PasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function AccountPage() {
  const {
    user,
    isLoading,
    isError,
    updateProfile,
    changePassword,
    uploadProfilePicture,
    deleteProfilePicture,
    isUpdatingProfile,
    isChangingPassword,
    isUploadingProfilePicture,
    isDeletingProfilePicture,
  } = useAccountPage();

  if (isLoading) {
    return <LoadingState text="Loading account..." />;
  }

  if (isError) {
    return <ErrorState title="Could not load account." />;
  }

  if (!user) {
    return (
      <EmptyState
        icon={<LuUser />}
        title="No account found"
        description="Your account information could not be loaded."
      />
    );
  }

  return (
    <Stack gap={6}>
      <Section
        title="Account"
        description="Manage your profile, password, and profile picture."
        headerIcon={<LuUser />}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} alignItems="start">
          <Stack gap={6}>
            <ProfileSummaryCard
              user={user}
              isUploading={isUploadingProfilePicture}
              isDeleting={isDeletingProfilePicture}
              onUploadProfilePicture={uploadProfilePicture}
              onDeleteProfilePicture={deleteProfilePicture}
            />

            <ProfileForm
              user={user}
              isSubmitting={isUpdatingProfile}
              onSubmit={(values) => {
                updateProfile({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                });
              }}
            />
          </Stack>

          <PasswordForm
            isSubmitting={isChangingPassword}
            onSubmit={(values, reset) => {
              changePassword(
                {
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword,
                },
                {
                  onSuccess: () => {
                    reset(defaultPasswordValues);
                  },
                },
              );
            }}
          />
        </SimpleGrid>
      </Section>
    </Stack>
  );
}

type ProfileSummaryCardProps = {
  user: UserDto;
  isUploading: boolean;
  isDeleting: boolean;
  onUploadProfilePicture: (file: File) => void;
  onDeleteProfilePicture: () => void;
};

function ProfileSummaryCard({
  user,
  isUploading,
  isDeleting,
  onUploadProfilePicture,
  onDeleteProfilePicture,
}: ProfileSummaryCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fullName = user ? `${user.firstName} ${user.lastName}` : undefined;
  const profilePictureUrl = getImageUrl(user?.profilePictureUrl);

  return (
    <StudyCard>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        display="none"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];

          if (file) {
            onUploadProfilePicture(file);
          }

          event.currentTarget.value = "";
        }}
      />

      <Stack gap={5}>
        <HStack gap={4} align="center">
          <StudyAvatar
            name={fullName}
            src={profilePictureUrl}
            size="lg"
            shape="circle"
          />

          <Box minW={0}>
            <StudyHeading size="sm" truncate>
              {fullName}
            </StudyHeading>

            <StudyText variant="muted" truncate>
              {user.email}
            </StudyText>

            <StudyBadge variant="accent" mt={1} w="fit-content" size="sm">
              {user.role}
            </StudyBadge>
          </Box>
        </HStack>

        <HStack gap={3} wrap="wrap">
          <StudyButton
            type="button"
            variant="secondary"
            size="sm"
            loading={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            <LuCamera />
            Upload picture
          </StudyButton>

          <StudyButton
            type="button"
            variant="danger"
            size="sm"
            loading={isDeleting}
            disabled={!user.profilePictureUrl}
            onClick={onDeleteProfilePicture}
          >
            <LuTrash2 />
            Remove
          </StudyButton>
        </HStack>
      </Stack>
    </StudyCard>
  );
}

type ProfileFormProps = {
  user: UserDto;
  isSubmitting: boolean;
  onSubmit: (values: ProfileFormData) => void;
};

function ProfileForm({ user, isSubmitting, onSubmit }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, [reset, user.email, user.firstName, user.lastName]);

  return (
    <AccountCard title="Profile information">
      <ProfileFormContent
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      />
    </AccountCard>
  );
}

type ProfileFormContentProps = {
  register: UseFormRegister<ProfileFormData>;
  errors: ReturnType<typeof useForm<ProfileFormData>>["formState"]["errors"];
  isSubmitting: boolean;
  onSubmit: () => void;
};

function ProfileFormContent({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: ProfileFormContentProps) {
  return (
    <Stack as="form" gap={4} onSubmit={onSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <StudyField
          label="First name"
          errorText={errors.firstName?.message}
          required
        >
          <StudyInput disabled={isSubmitting} {...register("firstName")} />
        </StudyField>

        <StudyField
          label="Last name"
          errorText={errors.lastName?.message}
          required
        >
          <StudyInput disabled={isSubmitting} {...register("lastName")} />
        </StudyField>
      </SimpleGrid>

      <StudyField label="Email" errorText={errors.email?.message} required>
        <StudyInput
          type="email"
          disabled={isSubmitting}
          {...register("email")}
        />
      </StudyField>

      <StudyButton
        type="submit"
        variant="primary"
        loading={isSubmitting}
        alignSelf="flex-end"
      >
        Save profile
      </StudyButton>
    </Stack>
  );
}

type PasswordFormProps = {
  isSubmitting: boolean;
  onSubmit: (
    values: PasswordFormData,
    reset: (values: PasswordFormData) => void,
  ) => void;
};

function PasswordForm({ isSubmitting, onSubmit }: PasswordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: defaultPasswordValues,
  });

  return (
    <AccountCard title="Change password">
      <PasswordFormContent
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit((values) => onSubmit(values, reset))}
      />
    </AccountCard>
  );
}

type PasswordFormContentProps = {
  register: UseFormRegister<PasswordFormData>;
  errors: ReturnType<typeof useForm<PasswordFormData>>["formState"]["errors"];
  isSubmitting: boolean;
  onSubmit: () => void;
};

function PasswordFormContent({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: PasswordFormContentProps) {
  return (
    <Stack as="form" gap={4} onSubmit={onSubmit}>
      <StudyField
        label="Current password"
        errorText={errors.currentPassword?.message}
        required
      >
        <StudyInput
          type="password"
          autoComplete="current-password"
          disabled={isSubmitting}
          {...register("currentPassword")}
        />
      </StudyField>

      <StudyField
        label="New password"
        errorText={errors.newPassword?.message}
        required
      >
        <StudyInput
          type="password"
          autoComplete="new-password"
          disabled={isSubmitting}
          {...register("newPassword")}
        />
      </StudyField>

      <StudyField
        label="Confirm password"
        errorText={errors.confirmPassword?.message}
        required
      >
        <StudyInput
          type="password"
          autoComplete="new-password"
          disabled={isSubmitting}
          {...register("confirmPassword")}
        />
      </StudyField>

      <StudyButton
        type="submit"
        variant="primary"
        loading={isSubmitting}
        alignSelf="flex-end"
      >
        Change password
      </StudyButton>
    </Stack>
  );
}

type AccountCardProps = BoxProps & {
  title: string;
};

function AccountCard({ title, children, ...props }: AccountCardProps) {
  return (
    <StudyCard {...props}>
      <Stack gap={4}>
        <Box>
          <StudyHeading size="lg">{title}</StudyHeading>
        </Box>
        <StudyDivider variant="strong"  />

        {children}
      </Stack>
    </StudyCard>
  );
}
