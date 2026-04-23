import { z } from "zod";
import { DESCRIPTION_MAX_LENGTH } from "../constants/schema.constant.js";

export const createTransactionSchema = z.object({
    monthId: z.coerce.bigint().min(1),
    amount: z.coerce.number().int().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty").max(DESCRIPTION_MAX_LENGTH),
});

export const getTransactionsSchema = z.object({
    monthId: z.coerce.bigint().min(1),
    category: z.enum(["needs", "wants", "savings", "all"]),
});

export const editTransactionSchema = z.object({
    transactionId: z.coerce.bigint().min(1),
    amount: z.coerce.number().int().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty").max(DESCRIPTION_MAX_LENGTH),
});


export const deleteTransactionSchema = z.object({
    transactionId: z.coerce.bigint().min(1)
});
