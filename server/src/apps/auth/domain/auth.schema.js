import { z } from "zod";

const registerSchema = z.object({
        email: z.string().email({ message: "email address is not valid" }),
        password: z.string().min(8, { message: "password must be at least 8 characters long" }),
        username: z.string().min(3).max(20),
});

const logInSchema = z.object({
        email: z.string().email({ message: "email address is not valid" }),
        password: z.string().min(8, { message: "password must be at least 8 characters long" }),
});

function inputValidation(data, schema) {

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

export const validateRegister = data => inputValidation(data, registerSchema);
export const validateLogIn = data => inputValidation(data, logInSchema);
