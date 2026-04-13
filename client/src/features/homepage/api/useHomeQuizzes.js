import useApiManager from "@/lib/API/apiManager";

// keep in mind pagination(page and limit)
export default function useHomeQuizzes () {
    return useApiManager('/api/home');
}