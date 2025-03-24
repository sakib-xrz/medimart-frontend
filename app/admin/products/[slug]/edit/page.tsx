"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import Link from "next/link";
import { categories, forms } from "@/lib/constant";
import { cn } from "@/lib/utils";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";
import { toast } from "sonner";

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
  pack_size: Yup.string(),
  manufacturer: Yup.string(),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .typeError("Stock must be a number"),
  expiry_date: Yup.date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date cannot be in the past")
    .typeError("Invalid date format"),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .typeError("Discount must be a number"),
});

export default function EditProduct({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data: productData, isLoading } = useGetProductDetailQuery(slug, {
    skip: !slug,
  });

  const router = useRouter();

  const [updateProduct, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();

  const product = productData?.data;

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      form: "",
      dosage: "",
      pack_size: "",
      manufacturer: "",
      price: "",
      stock: "",
      expiry_date: new Date(),
      discount: "0",
      discount_type: "PERCENTAGE",
      requires_prescription: false,
      in_stock: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
        discount: Number(values.discount),
        expiry_date: format(values.expiry_date, "yyyy-MM-dd"),
      };

      try {
        const response = await updateProduct({
          id: product._id,
          data: payload,
        }).unwrap();

        if (response) {
          toast.success("Product updated successfully.");
          router.push("/admin/products");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update product.");
      }
    },
  });

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        category: product.category,
        description: product.description,
        form: product.form,
        dosage: product.dosage,
        pack_size: product.pack_size,
        manufacturer: product.manufacturer,
        price: product.price,
        stock: product.stock,
        expiry_date: new Date(product.expiry_date),
        discount: product.discount,
        discount_type: product.discount_type,
        requires_prescription: product.requires_prescription,
        in_stock: product.in_stock,
      });
    }
    // eslint-disable-next-line
  }, [product]);

  useEffect(() => {
    formik.setFieldValue("in_stock", Number(formik.values.stock) > 0);
    // eslint-disable-next-line
  }, [formik.values.stock]);

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    const price = Number.parseFloat(String(formik.values.price)) || 0;
    const discount = Number.parseFloat(String(formik.values.discount)) || 0;

    if (discount <= 0) return price;

    if (formik.values.discount_type === "PERCENTAGE") {
      return price - (price * discount) / 100;
    } else {
      return price - discount;
    }
  };

  const discountedPrice = calculateDiscountedPrice();
  const hasDiscount =
    Number.parseFloat(String(formik.values.discount)) > 0 &&
    discountedPrice < Number.parseFloat(String(formik.values.price || "0"));

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      formik.setFieldValue("expiry_date", date);
    }
  };

  const isExpired = formik.values.expiry_date < new Date();

  return (
    <>
      <OverlayLoading isLoading={isLoading} />
      <div className="space-y-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Update Product
            </h1>
            <p className="text-muted-foreground">
              Update product information and details
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
                    value={formik.values.category || product?.category}
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
                        <SelectItem key={category.id} value={category.title}>
                          {category.title}
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
                <Label
                  htmlFor="description"
                  className="flex items-center gap-1"
                >
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
                  <Select
                    name="form"
                    value={formik.values.form || product?.form}
                    onValueChange={(value) =>
                      formik.setFieldValue("form", value)
                    }
                  >
                    <SelectTrigger
                      className={
                        formik.touched.form && formik.errors.form
                          ? "border-red-500"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                    <SelectContent>
                      {forms.map((form, index) => (
                        <SelectItem key={index} value={form}>
                          {form}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <p className="text-xs text-red-500">
                      {formik.errors.dosage}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="pack_size"
                    className="flex items-center gap-1"
                  >
                    Pack Size
                  </Label>
                  <Input
                    id="pack_size"
                    name="pack_size"
                    placeholder="10 tablets, 100ml, etc."
                    value={formik.values.pack_size}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="manufacturer"
                    className="flex items-center gap-1"
                  >
                    Manufacturer
                  </Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    placeholder="ABC Pharmaceuticals Ltd."
                    value={formik.values.manufacturer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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
                    <p className="text-xs text-red-500">
                      {formik.errors.price}
                    </p>
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
                    <p className="text-xs text-red-500">
                      {formik.errors.stock}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="expiry_date"
                    className="flex items-center gap-1"
                  >
                    Expiry Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={isExpired ? "destructive" : "outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formik.values.expiry_date && "text-muted-foreground",
                          !isExpired && "hover:bg-transparent hover:text-black",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formik.values.expiry_date ? (
                          format(formik.values.expiry_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={formik.values.expiry_date}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {formik.touched.expiry_date && formik.errors.expiry_date && (
                    <p className="text-xs text-red-500">
                      {String(formik.errors.expiry_date)}
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
                      name="discount_type"
                      value={formik.values.discount_type}
                      onValueChange={(value) =>
                        formik.setFieldValue("discount_type", value)
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
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
                    id="requires_prescription"
                    name="requires_prescription"
                    checked={formik.values.requires_prescription}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("requires_prescription", checked)
                    }
                  />
                  <Label htmlFor="requires_prescription">
                    Requires Prescription
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="in_stock"
                    name="in_stock"
                    checked={formik.values.in_stock}
                    disabled
                  />
                  <Label htmlFor="in_stock">In Stock</Label>
                </div>
              </div>

              {/* Price Preview */}
              {Number(formik.values.price) > 0 && (
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
                        ৳{" "}
                        {Number.parseFloat(String(formik.values.price)).toFixed(
                          2,
                        )}
                      </span>
                    </div>
                  ) : (
                    <Badge variant="outline">
                      ৳{" "}
                      {Number.parseFloat(String(formik.values.price)).toFixed(
                        2,
                      )}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdatingProduct}>
              {isUpdatingProduct ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
