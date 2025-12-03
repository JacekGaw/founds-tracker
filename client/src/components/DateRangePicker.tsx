import { useState } from "react";
import {
  getMonthRange,
  getRolingMonth,
  getRollingWeek,
  getThisWeek,
  getThisYearRange,
  getYearToDate,
} from "../helpers/dateHelpers";
import { ChevronDown } from "lucide-react";

type DateRangeType = {
  name: string;
  from: string;
  to: string;
};

const dateRangeOptions: DateRangeType[] = [
  {
    name: "Current week",
    ...getThisWeek(),
  },
  {
    name: "Week to date",
    ...getRollingWeek(),
  },
  {
    name: "Current month",
    ...getMonthRange(new Date()),
  },
  {
    name: "Month to date",
    ...getRolingMonth(),
  },
  {
    name: "Current year",
    ...getThisYearRange(),
  },
  {
    name: "Year to date",
    ...getYearToDate(),
  },
  {
    name: "Custom",
    from: "",
    to: "",
  },
];

const DateRangePicker: React.FC<{
  defaultValues: { from: string | undefined; to: string | undefined };
  onChange: (from: string, to: string, custom: boolean) => void;
}> = ({ defaultValues, onChange }) => {
  const getDefaultValue = (): DateRangeType => {
    const { from, to } = defaultValues;
    if (!from && !to) {
      return dateRangeOptions[2];
    }
    if (!from || !to) {
      return dateRangeOptions[6];
    }
    const matchedOption = dateRangeOptions.find(
      (option) => option.from === from && option.to === to
    );
    return matchedOption ?? dateRangeOptions[6];
  };

  const [valueChoosen, setValueChoosen] =
    useState<DateRangeType>(getDefaultValue);

  const handleClick = (index: number) => {
    const selected = dateRangeOptions[index];
    onChange(selected.from, selected.to, selected.name === "Custom");
    setValueChoosen(selected);
  };

  return (
    <div className="group relative w-auto">
      <div className="flex flex-col gap-2">
        <p className="text-text-muted">Date range</p>
        <div className="p-3 border border-border rounded-sm flex justify-between items-center gap-2">
          <p>{valueChoosen.name}</p>{" "}
          <ChevronDown size={18} className="group-hover:rotate-180" />
        </div>
      </div>
      <div className="group-hover:absolute group-hover:flex top-full left-0 bg-bg hidden flex-col w-full border border-border-muted">
        {dateRangeOptions.map((option, index) => (
          <div
            onClick={() => handleClick(index)}
            className="hover:bg-bg-dark cursor-pointer px-2 py-1 border-b border-border-muted text-sm"
            key={index}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateRangePicker;
