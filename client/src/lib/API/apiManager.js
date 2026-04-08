import { useState, useEffect } from "react";

import queryCache from "./queryCache.js";
import apiClient from "./api.client.js";

export default function useApiManager(path, options = {}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isValue, setIsValue] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                if (queryCache.has(path)) {
                    const cachedData = queryCache.get(path);
                    if (!cachedData) throw new Error("Empty Cache Node");

                    if (isMounted) {
                        setIsValue(cachedData);
                        setIsLoading(false);
                    }
                } else {
                    const value = await apiClient(path, options);

                    if (isMounted) {
                        setIsValue(value);
                        queryCache.put(path, value);
                        setIsLoading(false);
                    }
                }
            } catch (err) {
                if (isMounted) setIsError(true);
            }

        };
        fetchData();

        return () => {
            isMounted = false;
        }
    }, [path]);

    return { isError, isLoading, isValue };
}
