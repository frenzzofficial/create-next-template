import {
  changePasswordSchema,
  updateProfileSchema,
} from "../schemas/user.schema";
import type { FormListType } from "./form.types";

/**
 * profile.forms.ts
 * --------------------------------------------------------------
 * Two independent forms on the same profile page: editing the user's
 * own details, and changing their password. Kept as separate
 * form keys/schemas (not one combined form) since they're submitted,
 * validated, and (once a backend exists) sent to the API independently
 * of each other.
 */
export const profileFormConfig: Record<
  "UPDATE_PROFILE" | "CHANGE_PASSWORD",
  FormListType
> = {
  UPDATE_PROFILE: {
    key: "UPDATE_PROFILE",
    title: "Profile Details",
    description: "Update your name, email, and phone number.",
    icon: "User",
    submit: {
      label: "Save Changes",
      onSubmitLabel: "Saving...",
    },
    formInputs: [
      {
        key: "PROFILE-FULLNAME",
        id: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        errorMessage: "Full name is required",
      },
      {
        key: "PROFILE-EMAIL",
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
        errorMessage: "Email is required",
      },
      {
        key: "PROFILE-PHONE",
        id: "phone",
        label: "Phone Number",
        type: "text",
        placeholder: "+1234567890",
        required: true,
        errorMessage: "A valid phone number is required",
      },
    ],
  },

  CHANGE_PASSWORD: {
    key: "CHANGE_PASSWORD",
    title: "Change Password",
    description: "Choose a new password for your account.",
    icon: "Lock",
    submit: {
      label: "Update Password",
      onSubmitLabel: "Updating...",
    },
    formInputs: [
      {
        key: "PROFILE-CURRENT-PASSWORD",
        id: "currentPassword",
        label: "Current Password",
        type: "password",
        placeholder: "Enter current password",
        required: true,
        errorMessage: "Current password is required",
      },
      {
        key: "PROFILE-NEW-PASSWORD",
        id: "newPassword",
        label: "New Password",
        type: "password",
        placeholder: "Enter new password",
        required: true,
        errorMessage: "New password is required",
      },
      {
        key: "PROFILE-CONFIRM-PASSWORD",
        id: "confirmPassword",
        label: "Confirm New Password",
        type: "password",
        placeholder: "Confirm new password",
        required: true,
        errorMessage: "Please confirm your new password",
      },
    ],
  },
};

export type ProfileFormKey = keyof typeof profileFormConfig;

export const profileSchemaMap = {
  UPDATE_PROFILE: updateProfileSchema,
  CHANGE_PASSWORD: changePasswordSchema,
} as const;
