import { z } from "zod";

export const createFixedExpenseSchema = z.object({
    amount: z.coerce.number().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty"),
});

export const editFixedExpenseSchema = z.object({
    fixedExpenseId: z.coerce.bigint().min(1),
    amount: z.coerce.number().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty"),
});

export const deleteFixedExpenseSchema = z.object({
    fixedExpenseId: z.coerce.bigint().min(1)
});