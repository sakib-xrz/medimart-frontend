"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Info,
  Pill,
  Tag,
  DollarSign,
  Percent,
  ClipboardList,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Categories for the dropdown
const categories = [
  { name: "Women's Health", slug: "womens-health" },
  { name: "Pain Relief", slug: "pain-relief" },
  { name: "Antibiotics", slug: "antibiotics" },
  { name: "Vitamins", slug: "vitamins" },
  { name: "Medical Devices", slug: "medical-devices" },
  { name: "Diabetes", slug: "diabetes" },
];

// Product forms
const productForms = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Ointment",
  "Gel",
  "Spray",
  "Drops",
  "Powder",
  "Inhaler",
  "Patch",
  "Suppository",
  "Solution",
  "Suspension",
  "Device",
  "Kit",
  "Other",
];

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  form: Yup.string().required("Product form is required"),
  dosage: Yup.string(),
  description: Yup.string(),
  requiresPrescription: Yup.boolean(),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a number"),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .typeError("Discount must be a number"),
  discountType: Yup.string().oneOf(["PERCENTAGE", "FLAT"]),
  stock: Yup.number()
    .required("Stock quantity is required")
    .min(0, "Stock cannot be negative")
    .integer("Stock must be a whole number")
    .typeError("Stock must be a number"),
  inStock: Yup.boolean(),
  expiryDate: Yup.date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date cannot be in the past")
    .typeError("Invalid date"),
});

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      categorySlug: "",
      form: "",
      dosage: "",
      description: "",
      requiresPrescription: false,
      price: "",
      discount: "0",
      discountType: "PERCENTAGE",
      stock: "0",
      inStock: true,
      expiryDate: new Date(),
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setFormError(null);

      try {
        // In a real app, you would send this data to your API
        console.log("Submitting product data:", values);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Redirect to products page after successful creation
        router.push("/admin/products");
      } catch (error) {
        console.error("Error creating product:", error);
        setFormError("Failed to create product. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Handle category change to update categorySlug
  const handleCategoryChange = (value: string) => {
    formik.setFieldValue("category", value);

    const selectedCategory = categories.find((cat) => cat.name === value);
    if (selectedCategory) {
      formik.setFieldValue("categorySlug", selectedCategory.slug);
    }
  };

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      formik.setFieldValue("expiryDate", date);
    }
  };

  // Calculate discounted price for preview
  const calculateDiscountedPrice = () => {
    const price = Number.parseFloat(formik.values.price) || 0;
    const discount = Number.parseFloat(formik.values.discount) || 0;

    if (discount <= 0) return price;

    if (formik.values.discountType === "PERCENTAGE") {
      return price - price * (discount / 100);
    } else {
      return Math.max(0, price - discount);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">
            Add a new product to your inventory
          </p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Basic Product Information
            </CardTitle>
            <CardDescription>
              Enter the essential details about your product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  Product Name <span className="ml-1 text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter a clear, descriptive name for your product
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Prenatal Vitamins"
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
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center">
                  Category <span className="ml-1 text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Select the category that best fits your product
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={formik.values.category}
                  onValueChange={handleCategoryChange}
                  name="category"
                >
                  <SelectTrigger
                    id="category"
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
                      <SelectItem key={category.slug} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-sm text-red-500">
                    {formik.errors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="form" className="flex items-center">
                  Form <span className="ml-1 text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Select the physical form of the product
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={formik.values.form}
                  onValueChange={(value) => formik.setFieldValue("form", value)}
                  name="form"
                >
                  <SelectTrigger
                    id="form"
                    className={
                      formik.touched.form && formik.errors.form
                        ? "border-red-500"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent>
                    {productForms.map((form) => (
                      <SelectItem key={form} value={form}>
                        {form}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.form && formik.errors.form && (
                  <p className="text-sm text-red-500">{formik.errors.form}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage" className="flex items-center">
                  Dosage
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Specify the recommended dosage (e.g., &quot;500mg, Once
                        daily&quot;)
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="dosage"
                  name="dosage"
                  placeholder="e.g., 500mg, Once daily"
                  value={formik.values.dosage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center">
                Description
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Provide a detailed description of the product
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="requiresPrescription"
                checked={formik.values.requiresPrescription}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("requiresPrescription", checked)
                }
              />
              <Label
                htmlFor="requiresPrescription"
                className="flex items-center"
              >
                Requires Prescription
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Toggle if this product requires a prescription
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>
          </CardContent>

          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="mr-2 h-5 w-5 text-primary" />
              Additional Information
            </CardTitle>
            <CardDescription>
              Set expiry date and additional details
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="flex items-center">
                Expiry Date <span className="ml-1 text-red-500">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Select the expiry date of the product
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formik.values.expiryDate && "text-muted-foreground",
                      formik.touched.expiryDate &&
                        formik.errors.expiryDate &&
                        "border-red-500",
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formik.values.expiryDate ? (
                      format(formik.values.expiryDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={formik.values.expiryDate}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {formik.touched.expiryDate && formik.errors.expiryDate && (
                <p className="text-sm text-red-500">
                  {formik.errors.expiryDate as string}
                </p>
              )}
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Products with expired dates will be automatically marked as
                unavailable for purchase. Please ensure the expiry date is
                accurate.
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              Pricing & Inventory
            </CardTitle>
            <CardDescription>
              Set the price and inventory details for your product
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center">
                  Price (BDT) <span className="ml-1 text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter the base price of the product
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    ৳
                  </span>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pl-8 ${formik.touched.price && formik.errors.price ? "border-red-500" : ""}`}
                  />
                </div>
                {formik.touched.price && formik.errors.price && (
                  <p className="text-sm text-red-500">{formik.errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="flex items-center">
                  Stock Quantity <span className="ml-1 text-red-500">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter the number of units in stock
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
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
                  <p className="text-sm text-red-500">{formik.errors.stock}</p>
                )}
              </div>
            </div>

            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center space-x-2">
                <Percent className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Discount Settings</h3>
              </div>
              <Separator className="my-3" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="discount" className="flex items-center">
                    Discount Amount
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Enter the discount amount (percentage or flat amount)
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
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
                  {formik.touched.discount && formik.errors.discount && (
                    <p className="text-sm text-red-500">
                      {formik.errors.discount}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountType" className="flex items-center">
                    Discount Type
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Select whether the discount is a percentage or flat
                          amount
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Select
                    value={formik.values.discountType}
                    onValueChange={(value) =>
                      formik.setFieldValue("discountType", value)
                    }
                    name="discountType"
                  >
                    <SelectTrigger id="discountType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                      <SelectItem value="FLAT">Flat Amount (BDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formik.values.price &&
                formik.values.discount &&
                Number.parseFloat(formik.values.discount) > 0 && (
                  <div className="mt-3 rounded-md bg-background p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Original Price:
                      </span>
                      <span className="text-sm">
                        ৳{" "}
                        {Number.parseFloat(
                          formik.values.price,
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Discount:
                      </span>
                      <span className="text-sm text-green-600">
                        {formik.values.discountType === "PERCENTAGE"
                          ? `${formik.values.discount}%`
                          : `৳ ${Number.parseFloat(formik.values.discount).toLocaleString()}`}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-sm">Final Price:</span>
                      <span className="text-sm">
                        ৳ {calculateDiscountedPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={formik.values.inStock}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("inStock", checked)
                }
              />
              <Label htmlFor="inStock" className="flex items-center">
                Available for Purchase
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Toggle if this product is available for purchase
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>

            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Product Status</h3>
              </div>
              <Separator className="my-3" />
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label className="text-sm">Current Status</Label>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        formik.values.inStock ? "default" : "destructive"
                      }
                      className="px-2 py-1"
                    >
                      {formik.values.inStock ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {formik.values.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>

                    {formik.values.requiresPrescription && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 px-2 py-1 text-amber-700"
                      >
                        <Pill className="mr-1 h-3 w-3" />
                        Prescription Required
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
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
