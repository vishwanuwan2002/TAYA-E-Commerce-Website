import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white rounded-[1.5rem] border-2 border-red-200/50 shadow-md shadow-red-200/20 h-fit sticky top-24 transition-all">
      <div className="p-4 border-b border-red-200/30">
        <h2 className="text-lg font-bold text-black">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider text-red-600">{keyItem}</h3>
              <div className="grid gap-2 mt-3">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex font-semibold items-center gap-2 text-gray-700 hover:text-black cursor-pointer transition-colors">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="border-red-300 bg-red-50"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="bg-red-100/50" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;