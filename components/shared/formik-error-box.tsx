import { FormikErrors, FormikTouched } from "formik";

interface FormikErrorBoxProps {
  formik: {
    errors: FormikErrors<Record<string, unknown>>;
    touched: FormikTouched<Record<string, unknown>>;
  };
  field: string;
}

export default function FormikErrorBox({ formik, field }: FormikErrorBoxProps) {
  const showError = formik.errors[field] && formik.touched[field];
  const defaultClassNames = "mt-1 text-sm text-destructive font-medium";
  const errorMessage = formik.errors[field];

  return showError && typeof errorMessage === "string" ? (
    <div className={defaultClassNames}>{errorMessage}</div>
  ) : null;
}
