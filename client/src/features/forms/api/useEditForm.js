import useApiManager from "@/lib/API/apiManager";
import useMutation from "@/lib/API/useMutation";
import queryCache from "@/lib/API/queryCache";

// PUT 
export default function useEditForms (id) {
    const METHOD = 'PUT';
    const editedValue = useMutation(`/api/home/edit/${id}`,  METHOD);

    const {isValue, isError} = editedValue;
    if (isValue && !isError) queryCache.invalidate('/api/home');

    return editedValue;
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
