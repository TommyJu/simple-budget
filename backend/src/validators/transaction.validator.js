import { z } from "zod";

export const createTransactionSchema = z.object({
    monthId: z.coerce.bigint().min(1),
    amount: z.coerce.number().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty").max(30),
});

export const getTransactionsSchema = z.object({
    monthId: z.coerce.bigint().min(1),
    category: z.enum(["needs", "wants", "savings", "all"]),
});

export const editTransactionSchema = z.object({
    transactionId: z.coerce.bigint().min(1),
    amount: z.coerce.number().min(0),
    category: z.enum(["needs", "wants", "savings"]),
    description: z.string().min(1, "Description cannot be empty").max(30),
});


export const deleteTransactionSchema = z.object({
    transactionId: z.coerce.bigint().min(1)
});
