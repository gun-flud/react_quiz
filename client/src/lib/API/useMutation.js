import { useState } from "react";
import apiClient from "./api.client";
import queryCache from "./queryCache";

export default function useMutation(path, METHOD) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValue, setIsValue] = useState(null);

    // const mutate = async () => {
    async function mutate(data) {
        setIsLoading(true);
        setIsError(false);

        try {
            const dataStr = JSON.stringify(data);

            const options = {
                method: METHOD,
                body: dataStr,
            };

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