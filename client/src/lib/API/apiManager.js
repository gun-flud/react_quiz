import { useState, useEffect } from "react";

import queryCache from "./queryCache.js";
import apiClient from "./api.client.js";

export default function useApiManager(path, options = {}) {
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    // const [isValue, setIsValue] = useState(null);

    //way much faster case:
    const hasCacheData = queryCache.has(path);
    const cacheData = queryCache.get(path)

    const [isLoading, setIsLoading] = useState(!hasCacheData);
    const [isError, setIsError] = useState(false);
    const [isValue, setIsValue] = useState(cacheData);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                if (queryCache.has(path)) {
                    const cachedData = queryCache.get(path);
                    if (!cachedData) throw new Error("Empty Cache Node");

                    if (!signal.aborted) {
                        setIsValue(cachedData);
                        setIsLoading(false);
                        // console.log('data from cache');
                    }
                } else {
                    const requestOptions = { ...options, signal };

                    const value = await apiClient(path, requestOptions);

                    if (!signal.aborted) {
                        setIsValue(value);
                        queryCache.put(path, value);
                        setIsLoading(false);
                        // console.log('data from server');
                    }
                }
            } catch (err) {
                if (err.name === "AbortError") return;

                if (!signal.aborted) {
                    setIsError(true); 
                    setIsLoading(false);
                }
                console.error(err.message);
            }

        };
        fetchData();

        return () => {
            controller.abort(); 
        }
    }, [path]);

    return { isError, isLoading, isValue };
}


