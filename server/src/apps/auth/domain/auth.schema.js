import { z } from "zod";

const schema = z.object({
        email: z.string().email({ message: "email address is not valid" }),
        password: z.string().min(8, { message: "password must be at least 8 characters long" }),
        username: z.string().min(3).max(20).optional(),
});

export default function inputValidation(data) {

    const result = schema.safeParse(data);

    if (!result.success) {
        const errorsMessages = result.error.errors.map(err => err.message);

        return {
            isValid: false,
            errors: errorsMessages
        }
    }

    return {
        isValid: true,
        data: result.data 
    }  
}
