import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utilities/constant";

export default function useBrands() {
    function getBrands() {
        return axios.get(BASE_URL + '/api/v1/brands')
    }

    const response =
        useQuery({
            queryKey: ['brands'],
            queryFn: getBrands,
            select: (data) => data.data.data
        })
    return response
}
