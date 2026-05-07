import { useState } from "react";
import apiClient from "./api.client";
import queryCache from "./queryCache";

export default function useMutation(path, METHOD) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValue, setIsValue] = useState(null);

    // const mutate = async () => {
    async function mutate(data) {
        if (!isValue) setIsLoading(true);
        setIsError(false);

        try {
            const options = {
                method: METHOD,
            };

            if (data && METHOD !== 'GET') {
                options.body = JSON.stringify(data);
            }

            const value = await apiClient(path, options);
            setIsValue(value);

            return value;
        } catch (error) {
            setIsError(true);
            console.error("Fetch error", error.message);

        } finally {
            setIsLoading(false);
        }
    }

    return { mutate, isError, isLoading, isValue };
}