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

interface ProductListFiltersProps {
  categories?: string[];
  forms: string[];
  className?: string;
}

export default function ProductListFilters({
  categories,
  forms,
  className = "",
}: ProductListFiltersProps) {
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
                      id={`category-${category}`}
                      // checked={selectedCategories.includes(category)}
                      // onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label
                      htmlFor={`category-${category}`}
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
                    // checked={selectedForms.includes(form)}
                    // onCheckedChange={() => handleFormChange(form)}
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
                  id="in-stock"
                  //   checked={inStockOnly}
                  //   onCheckedChange={(checked) =>
                  //     setInStockOnly(checked === true)
                  //   }
                />
                <Label
                  htmlFor="in-stock"
                  className="cursor-pointer text-sm font-normal"
                >
                  In Stock Only
                </Label>
              </div>

              <Separator className="my-2" />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Prescription</Label>
                <RadioGroup
                  //   value={prescriptionFilter}
                  //   onValueChange={setPrescriptionFilter}
                  className="flex flex-col space-y-1"
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
