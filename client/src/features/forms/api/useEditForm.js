import useApiManager from "@/lib/API/apiManager";
import useMutation from "@/lib/API/useMutation";
import queryCache from "@/lib/API/queryCache";

// GET
export default function useEditForms (id) {
    queryCache.invalidate('/api/home');
    const METHOD = 'PUT'
    return useMutation(`/api/home/edit/${id}`,  METHOD);
}

export  function useIdQuiz (id) {

    const path = `/api/home/quiz/${id}`;
    return useApiManager(path);
}

// POST
export function useCreateForm (data) {
    const path = `/api/home/create`;
    const METHOD = 'POST';

    queryCache.invalidate('/api/home');

    return useMutation(path, METHOD);
}
