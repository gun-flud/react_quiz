import useApiManager from "@/lib/API/apiManager.js";

// keep in mind pagination(page and limit)
export default function useQuizById (id) {

    const path = `/api/home/quiz/${id}`;
    return useApiManager(path);
}

