import apiClient from '@/lib/API/api.client.js'


// keep in mind pagination(page and limit)
export default async function getQuizzes () {
    const data = await apiClient('/api/home');


}