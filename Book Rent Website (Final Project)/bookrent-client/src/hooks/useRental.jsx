import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useRental = () => {
    const axiosPublic = useAxiosPublic();
    const {data: transaction =[], isPending: loading, refetch} = useQuery({
        queryKey:['transaction'],
        queryFn:async() => {
            const res = await axiosPublic.get('http://localhost:6001/transactions/transactions');
            console.log(res.data)
            return res.data;
        },

    })

    return [transaction, loading, refetch]
  return (
    <div>use Rental</div>
  )
}

export default useRental