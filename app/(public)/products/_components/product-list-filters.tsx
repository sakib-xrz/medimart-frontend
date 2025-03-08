/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TParams } from "../page";

interface ProductListFiltersProps {
  categories?: string[];
  forms: string[];
  params: TParams;
  setParams: (params: TParams) => void;
  className?: string;
}

export default function ProductListFilters({
  categories,
  forms,
  params,
  setParams,
  className = "",
}: ProductListFiltersProps) {
  const handleCategoryChange = (category: string) => {
    const updatedCategories = params.category?.includes(category)
      ? params.category?.filter((c) => c !== category)
      : [...params.category, category];

    setParams((prev: TParams) => ({ ...prev, category: updatedCategories }));
  };

  const handleFormChange = (form: string) => {
    const updatedForms = params.form?.includes(form)
      ? params.form?.filter((c) => c !== form)
      : [...params.form, form];

    setParams((prev: TParams) => ({ ...prev, form: updatedForms }));
  };

  return (
    <ScrollArea className={className}>
      <Accordion
        type="multiple"
        defaultValue={
          categories ? ["category", "availability"] : ["form", "availability"]
        }
        className="pr-4"
      >
        {/* Category Filter */}

        {categories && (
          <AccordionItem value="category">
            <AccordionTrigger className="text-base font-medium">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={params?.category?.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label
                      htmlFor={category}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Form Filter */}
        <AccordionItem value="form">
          <AccordionTrigger className="text-base font-medium">
            Product Form
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {forms.map((form) => (
                <div key={form} className="flex items-center space-x-2">
                  <Checkbox
                    id={`form-${form}`}
                    checked={params?.form?.includes(form)}
                    onCheckedChange={() => handleFormChange(form)}
                  />
                  <Label
                    htmlFor={`form-${form}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {form}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability Filter */}
        <AccordionItem value="availability">
          <AccordionTrigger className="text-base font-medium">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in_stock"
                  checked={params?.in_stock ? true : false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setParams((prev: TParams) => ({
                        ...prev,
                        in_stock: true,
                      }));
                    } else {
                      setParams((prev: TParams) => ({
                        ...prev,
                        in_stock: null,
                      }));
                    }
                  }}
                />
                <Label
                  htmlFor="in_stock"
                  className="cursor-pointer text-sm font-normal"
                >
                  In Stock
                </Label>
              </div>

              <Separator className="my-2" />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Prescription</Label>
                <RadioGroup
                  className="flex flex-col space-y-1"
                  value={
                    params?.requires_prescription === null
                      ? "all"
                      : params?.requires_prescription === false
                        ? "no-prescription"
                        : "prescription"
                  }
                  onValueChange={(value) => {
                    if (value === "all") {
                      setParams((prev: TParams) => ({
                        ...prev,
                        requires_prescription: null,
                      }));
                    } else if (value === "no-prescription") {
                      setParams((prev: TParams) => ({
                        ...prev,
                        requires_prescription: false,
                      }));
                    } else if (value === "prescription") {
                      setParams((prev: TParams) => ({
                        ...prev,
                        requires_prescription: true,
                      }));
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label
                      htmlFor="all"
                      className="cursor-pointer text-sm font-normal"
                    >
                      All Products
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no-prescription"
                      id="no-prescription"
                    />
                    <Label
                      htmlFor="no-prescription"
                      className="cursor-pointer text-sm font-normal"
                    >
                      No Prescription Required
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prescription" id="prescription" />
                    <Label
                      htmlFor="prescription"
                      className="cursor-pointer text-sm font-normal"
                    >
                      Prescription Required
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  );
}
