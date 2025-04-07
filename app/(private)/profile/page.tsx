"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield, Eye, EyeOff } from "lucide-react";
import Container from "@/components/shared/container";
import { useGetProfileQuery } from "@/redux/features/profile/profileApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: userProfileData, isLoading: isLoadingProfile } =
    useGetProfileQuery(undefined);

  const [changePassword, { isLoading: isLoadingChangePassword }] =
    useChangePasswordMutation();

  // Password change form with Formik and Yup
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        };

        await changePassword(payload).unwrap();

        toast.success("Password changed successfully!");

        resetForm();
      } catch (error) {
        console.error("Error changing password:", error);
        toast.error("Failed to change password.");
      }
    },
  });

  const userData = userProfileData?.data || {};

  return (
    <Container>
      <OverlayLoading isLoading={isLoadingProfile} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information Card */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              View and manage your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center rounded-lg bg-muted/50 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={32} />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">{userData.role}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email</span>
                </div>
                <p className="text-sm">{userData.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Role</span>
                </div>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {userData.role}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Account ID</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {userData._id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.currentPassword &&
                      formik.errors.currentPassword
                        ? "border-destructive"
                        : ""
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formik.touched.currentPassword &&
                  formik.errors.currentPassword && (
                    <p className="mt-1 text-xs text-destructive">
                      {formik.errors.currentPassword}
                    </p>
                  )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? "border-destructive"
                        : ""
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="mt-1 text-xs text-destructive">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-destructive"
                        : ""
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-xs text-destructive">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={formik.isSubmitting || isLoadingChangePassword}
                >
                  {formik.isSubmitting || isLoadingChangePassword
                    ? "Updating..."
                    : "Update Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ProfilePage;
