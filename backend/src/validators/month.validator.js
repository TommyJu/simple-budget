import { z } from "zod";

export const createMonthSchema = z.object({
  year: z.coerce.number().int().min(2000),
  month: z.coerce.number().int().min(1).max(12),
  income: z.coerce.number().min(0),
  needsPercentage: z.coerce.number().int().min(0).max(100),
  wantsPercentage: z.coerce.number().int().min(0).max(100),
  savingsPercentage: z.coerce.number().int().min(0).max(100),
}).refine(
  (data) =>
    data.needsPercentage +
    data.wantsPercentage +
    data.savingsPercentage === 100,
  {
    message: "Percentages must total 100",
  }
);