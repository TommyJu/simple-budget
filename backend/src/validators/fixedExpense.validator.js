import { z } from "zod";
import { DESCRIPTION_MAX_LENGTH } from "../constants/schema.constant.js";

export const createFixedExpenseSchema = z.object({
    amount: z.coerce.number().int().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty").max(DESCRIPTION_MAX_LENGTH),
});

export const editFixedExpenseSchema = z.object({
    fixedExpenseId: z.coerce.bigint().min(1),
    amount: z.coerce.number().int().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty").max(DESCRIPTION_MAX_LENGTH),
});