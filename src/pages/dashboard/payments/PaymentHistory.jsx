import React, { useState } from "react";
import { FaTh, FaTable } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import TableView from "./paymentview/TableView";
import CardView from "./paymentview/CardView";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading";
import useSecureAxios from "../../../hooks/useSecureAxios";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const [isTableView, setIsTableView] = useState(true);
  const { user } = useAuth()
  const secureAxios = useSecureAxios()
  const { data, isLoading } = useQuery(
    {
      queryKey: ['payments'],
      queryFn: async () => {
        const res = await secureAxios.get('/payments', {
          params: { email: user.email }
        })
        return res.data
      }
    }
  )
  const payments = data
  return (
    <div className="md:p-6 p-4 lg:py-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-500 mb-1">
            Payment History
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Review your recent payments and transactions below.
          </p>
        </div>

        <button
          onClick={() => setIsTableView(!isTableView)}
          className="btn btn-outline dark:btn-success flex items-center gap-2"
        >
          {isTableView ? (
            <>
              <FaTh /> View as Cards
            </>
          ) : (
            <>
              <FaTable /> View as Table
            </>
          )}
        </button>
      </div>
      {/*Found a solution for better displaying data not displaying No data found*/}
      {
        isLoading ? (
          <Loading />
        ) : isTableView ? (
          <TableView payments={payments} />
        ) : (
          <CardView payments={payments} />
        )
      }

    </div>
  );
};

export default PaymentHistory;
