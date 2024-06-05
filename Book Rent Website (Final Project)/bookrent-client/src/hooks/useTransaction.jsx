import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useTransaction = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token');
    const { refetch, data: transaction = [], isLoading, error } = useQuery({
        queryKey: ['transactions', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/transactions?email=${ user?.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            return res.json();
        },
    });

    return [transaction, refetch, isLoading, error];
};

export default useTransaction;
