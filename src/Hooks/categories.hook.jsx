import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utilities/constant";

export default function useCategories() {
    function getCategories() {
        return axios.get(BASE_URL + '/api/v1/categories')
    }

    const response =
        useQuery({
            queryKey: ['categories'],
            queryFn: getCategories,
            select: (data) => data.data.data
        })
    return response
}
