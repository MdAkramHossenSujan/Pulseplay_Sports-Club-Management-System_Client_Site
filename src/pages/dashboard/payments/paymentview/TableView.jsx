const TableView = ({ payments }) => {
    return (
      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full">
          <thead className="border border-green-600">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments?.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-mono dark:text-green-400">
                    {payment.transactionId}
                  </td>
                  <td className=" font-semibold dark:text-green-400">
                    ${payment.amount}
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  export default TableView