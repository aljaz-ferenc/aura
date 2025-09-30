import {z} from "zod";

export const initUserDataSchema = z.object({
    clerkId: z.string().min(1, {error: 'clerkId is required'}),
    firstName: z.string().min(1, {error: 'firstName is required'}),
    lastName: z.string().min(1, {error: 'lastName is required'}),
    email: z.email().min(1, {error: 'email is required'}),
    avatar: z.url().min(1, {error: 'avatar url is required'})
})

export type InitUserData = z.infer<typeof initUserDataSchema>