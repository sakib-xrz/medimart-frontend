"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CreditCard,
  FileUp,
  Info,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Container from "@/components/shared/container";
import { useGetCartItemsMutation } from "@/redux/features/cart/cartApi";
import { useCartProducts } from "@/redux/features/cart/cartSlice";
import { useGetProfileQuery } from "@/redux/features/profile/profileApi";

interface ICartProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  dosage: string;
  form: string;
  description: string;
  requires_prescription: boolean;
  discount: number;
  discount_type: "PERCENTAGE" | "FLAT";
  in_stock: boolean;
  expiry_date: string;
  quantity: number;
}

interface ICartData {
  products: ICartProduct[];
  subtotal: number;
  shipping_charge: number;
  grand_total: number;
  prescription_required: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartData, setCartData] = useState<ICartData>({
    products: [],
    subtotal: 0,
    shipping_charge: 0,
    grand_total: 0,
    prescription_required: false,
  });
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cartItems = useCartProducts();
  const [getCart] = useGetCartItemsMutation();

  const { data: profileData } = useGetProfileQuery({});

  useEffect(() => {
    getCart({ cart_items: cartItems }).then(({ data }) => {
      setCartData(data?.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const cartProducts = cartData?.products || [];
  const subtotal = cartData?.subtotal || 0;
  const shippingFee = cartData?.shipping_charge || 0;
  const total = cartData?.grand_total || 0;
  const requiresPrescription = cartData?.prescription_required || false;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
      prescription: undefined,
      paymentMethod: "sslcommerz",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
        .required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      postalCode: Yup.string().required("Postal code is required"),
      notes: Yup.string(),
      prescription: requiresPrescription
        ? Yup.mixed().required(
            "Prescription is required for some items in your cart",
          )
        : Yup.mixed(),
      paymentMethod: Yup.string().required("Payment method is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        console.log("Form values:", values);
        console.log("Prescription file:", prescriptionFile);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Redirect to success page
        router.push("/checkout/success");
      } catch (error) {
        console.error("Checkout error:", error);
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (profileData) {
      formik.setFieldValue("name", profileData?.data?.name);
      formik.setFieldValue("email", profileData?.data?.email);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPrescriptionFile(file);
    formik.setFieldValue("prescription", file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="flex-1 bg-muted/30">
      <Container>
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        <h1 className="mb-6 text-3xl font-bold tracking-tight">Checkout</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Shipping Information */}
            <div className="space-y-8 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>
                    Enter your details for delivery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={cn(
                          formik.touched.name &&
                            formik.errors.name &&
                            "border-red-500",
                        )}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-xs text-red-500">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={cn(
                          formik.touched.email &&
                            formik.errors.email &&
                            "border-red-500",
                        )}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-xs text-red-500">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="01XXXXXXXXX"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn(
                        formik.touched.phone &&
                          formik.errors.phone &&
                          "border-red-500",
                      )}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-xs text-red-500">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="123 Main St, Apartment 4B"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn(
                        formik.touched.address &&
                          formik.errors.address &&
                          "border-red-500",
                      )}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-xs text-red-500">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Dhaka"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={cn(
                          formik.touched.city &&
                            formik.errors.city &&
                            "border-red-500",
                        )}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <p className="text-xs text-red-500">
                          {formik.errors.city}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">
                        Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="1200"
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={cn(
                          formik.touched.postalCode &&
                            formik.errors.postalCode &&
                            "border-red-500",
                        )}
                      />
                      {formik.touched.postalCode &&
                        formik.errors.postalCode && (
                          <p className="text-xs text-red-500">
                            {formik.errors.postalCode}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Special instructions for delivery"
                      value={formik.values.notes}
                      onChange={formik.handleChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Prescription Upload */}
              {requiresPrescription && (
                <Card>
                  <CardHeader>
                    <CardTitle>Prescription Upload</CardTitle>
                    <CardDescription>
                      Upload a valid prescription for prescription-only
                      medications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-4 border-amber-200 bg-amber-50 text-amber-800">
                      <AlertDescription className="flex items-start gap-2">
                        <div>
                          <AlertCircle className="mt-0.5 size-4" />
                        </div>
                        Your cart contains prescription medication. Please
                        upload a valid prescription to proceed.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="prescription"
                        name="prescription"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                      />

                      <div
                        onClick={triggerFileInput}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:bg-muted/50",
                          formik.touched.prescription &&
                            formik.errors.prescription
                            ? "border-red-500"
                            : prescriptionFile
                              ? "border-green-500"
                              : "border-muted-foreground/25",
                        )}
                      >
                        {prescriptionFile ? (
                          <>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                              <Check className="h-5 w-5 text-green-600" />
                            </div>
                            <p className="font-medium">
                              {prescriptionFile.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {(prescriptionFile.size / 1024 / 1024).toFixed(2)}{" "}
                              MB
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPrescriptionFile(null);
                                formik.setFieldValue("prescription", undefined);
                              }}
                            >
                              Change File
                            </Button>
                          </>
                        ) : (
                          <>
                            <FileUp className="mb-2 h-10 w-10 text-muted-foreground" />
                            <p className="font-medium">
                              Click to upload prescription
                            </p>
                            <p className="text-sm text-muted-foreground">
                              JPG, JPEG, PNG or PDF (Max 5MB)
                            </p>
                          </>
                        )}
                      </div>

                      {formik.touched.prescription &&
                        formik.errors.prescription && (
                          <p className="text-xs text-red-500">
                            {formik.errors.prescription as string}
                          </p>
                        )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Select your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    name="paymentMethod"
                    value={formik.values.paymentMethod}
                    onValueChange={(value) =>
                      formik.setFieldValue("paymentMethod", value)
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                      <Label
                        htmlFor="sslcommerz"
                        className="flex flex-1 items-center gap-2 font-normal"
                      >
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>SSLCOMMERZ</span>
                      </Label>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Info className="h-3 w-3" />
                        <span>Secure online payment</span>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 rounded-lg bg-primary/5 p-4">
                    <p className="text-sm">
                      You will be redirected to SSLCOMMERZ secure payment
                      gateway to complete your payment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-2">
                    {cartProducts.map((item) => {
                      const itemPrice =
                        item.discount > 0
                          ? item.discount_type === "PERCENTAGE"
                            ? item.price - (item.price * item.discount) / 100
                            : item.price - item.discount
                          : item.price;

                      return (
                        <div key={item._id} className="flex justify-between">
                          <div className="flex-1">
                            <span className="text-sm">
                              {item.name} {item.requires_prescription && "🔒"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              × {item.quantity}
                            </span>
                          </div>
                          <span className="text-sm">
                            BDT {(itemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>BDT {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `BDT ${shippingFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>BDT {total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Container>
    </main>
  );
}
