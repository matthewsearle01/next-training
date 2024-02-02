'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),});
   
const CreateCaseStudy = FormSchema.omit({ id: true, date: true });

export async function createCaseStudy(formData: FormData) {
    const { customerId, amount, status } = CreateCaseStudy.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    // Test it out:
    // console.log(rawFormData);

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

// Use Zod to update the expected types
const UpdateCaseStudy = FormSchema.omit({ id: true, date: true });

export async function updateCaseStudy(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateCaseStudy.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
    `;

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function deleteCaseStudy(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard');
}
