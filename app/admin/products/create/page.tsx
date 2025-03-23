"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock categories for the form
const categories = [
  { id: "1", name: "Pain Relief", slug: "pain-relief" },
  { id: "2", name: "Cold & Flu", slug: "cold-and-flu" },
  { id: "3", name: "Digestive Health", slug: "digestive-health" },
  { id: "4", name: "Vitamins & Supplements", slug: "vitamins-and-supplements" },
  { id: "5", name: "Women's Health", slug: "womens-health" },
  { id: "6", name: "Men's Health", slug: "mens-health" },
  { id: "7", name: "Skin Care", slug: "skin-care" },
];

// Form validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  form: Yup.string().required("Form is required"),
  dosage: Yup.string().required("Dosage is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a number"),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .typeError("Stock must be a number"),
  expiryDate: Yup.date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date cannot be in the past")
    .typeError("Invalid date format"),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .typeError("Discount must be a number"),
});

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      form: "",
      dosage: "",
      price: "",
      stock: "",
      expiryDate: "",
      discount: "0",
      discountType: "PERCENTAGE",
      requiresPrescription: false,
      inStock: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      // Simulate API call
      console.log("Submitting product:", values);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to products page after successful creation
      router.push("/admin/products");
    },
  });

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    const price = Number.parseFloat(formik.values.price) || 0;
    const discount = Number.parseFloat(formik.values.discount) || 0;

    if (discount <= 0) return price;

    if (formik.values.discountType === "PERCENTAGE") {
      return price - (price * discount) / 100;
    } else {
      return price - discount;
    }
  };

  const discountedPrice = calculateDiscountedPrice();
  const hasDiscount =
    Number.parseFloat(formik.values.discount) > 0 &&
    discountedPrice < Number.parseFloat(formik.values.price || "0");

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">
            Fill in the details to create a new product
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="link" asChild className="hover:no-underline">
            <Link href="/admin/products">
              <ArrowLeft size={16} />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs text-red-500">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-1">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="category"
                  value={formik.values.category}
                  onValueChange={(value) =>
                    formik.setFieldValue("category", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.touched.category && formik.errors.category
                        ? "border-red-500"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-xs text-red-500">
                    {formik.errors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-1">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : ""
                }
                rows={3}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="form" className="flex items-center gap-1">
                  Form <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="form"
                  name="form"
                  placeholder="Tablet, Capsule, Syrup, etc."
                  value={formik.values.form}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.form && formik.errors.form
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.form && formik.errors.form && (
                  <p className="text-xs text-red-500">{formik.errors.form}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage" className="flex items-center gap-1">
                  Dosage <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dosage"
                  name="dosage"
                  placeholder="500mg, 10ml, etc."
                  value={formik.values.dosage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.dosage && formik.errors.dosage
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.dosage && formik.errors.dosage && (
                  <p className="text-xs text-red-500">{formik.errors.dosage}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-1">
                  Price (BDT) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ৳
                  </span>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="0.00"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-8 ${formik.touched.price && formik.errors.price ? "border-red-500" : ""}`}
                  />
                </div>
                {formik.touched.price && formik.errors.price && (
                  <p className="text-xs text-red-500">{formik.errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="flex items-center gap-1">
                  Stock <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="text"
                  placeholder="0"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.stock && formik.errors.stock
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.stock && formik.errors.stock && (
                  <p className="text-xs text-red-500">{formik.errors.stock}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="flex items-center gap-1">
                  Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.expiryDate && formik.errors.expiryDate
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <p className="text-xs text-red-500">
                    {formik.errors.expiryDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount" className="flex items-center gap-1">
                  Discount
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="discount"
                      name="discount"
                      type="text"
                      placeholder="0"
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.discount && formik.errors.discount
                          ? "border-red-500"
                          : ""
                      }
                    />
                  </div>
                  <Select
                    name="discountType"
                    value={formik.values.discountType}
                    onValueChange={(value) =>
                      formik.setFieldValue("discountType", value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                      <SelectItem value="FLAT">Flat Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formik.touched.discount && formik.errors.discount && (
                  <p className="text-xs text-red-500">
                    {formik.errors.discount}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="requiresPrescription"
                  name="requiresPrescription"
                  checked={formik.values.requiresPrescription}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("requiresPrescription", checked)
                  }
                />
                <Label htmlFor="requiresPrescription">
                  Requires Prescription
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  name="inStock"
                  checked={formik.values.inStock}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("inStock", checked)
                  }
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
            </div>

            {/* Price Preview */}
            {formik.values.price && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Final Price:
                </span>
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      ৳ {discountedPrice.toFixed(2)}
                    </Badge>
                    <span className="text-sm text-muted-foreground line-through">
                      ৳ {Number.parseFloat(formik.values.price).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <Badge variant="outline">
                    ৳ {Number.parseFloat(formik.values.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !formik.isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
