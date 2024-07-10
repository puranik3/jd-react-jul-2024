import axios from "axios";
import IWorkshop from "../models/IWorkshop";

const getWorkshops = async (_page: number, token: string = "") => {
    const response = await axios.get(`/workshops`, {
        params: {
            // _page: _page
            _page,
        },
    });
    return response.data as IWorkshop[];
};

const getWorkshopById = async (id: string | number, token: string = "") => {
    const response = await axios.get(`/workshops/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data as IWorkshop;
};

export { getWorkshops, getWorkshopById };
