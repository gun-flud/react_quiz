// import useApiManager from "@/lib/API/apiManager";
import useMutation from "@/lib/API/useMutation";
import queryCache from "@/lib/API/queryCache";
import { useEffect } from "react";

// keep in mind pagination(page and limit)
export function useHomeQuizzes() {
    const { mutate, isError, isLoading, isValue } = useMutation(
        "/api/home",
        "GET",
    );

    useEffect(() => {
        queryCache.invalidate("/api/home");
        mutate();
    }, []);

    return { refetch: mutate, isError, isLoading, quizzes: isValue };
}
