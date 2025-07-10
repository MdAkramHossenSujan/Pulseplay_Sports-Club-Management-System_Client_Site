import { BsCashCoin } from "react-icons/bs";
import NoData from "../../../../shared/NoData";

const CardView = ({ payments }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments?.length > 0 ? (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-green-600 rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <BsCashCoin className="dark:text-green-600 text-3xl" />
                <div>
                  <h3 className="text-lg font-bold dark:text-green-400">
                    $ {payment.amount}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold dark:text-green-700 dark:text-green-400">
                    Transaction:
                  </span>{" "}
                  {payment.transactionId}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center col-span-full py-10">
            <div className="py-6">
            <NoData/>
            </div>
            <p>No payments found.</p>
          </div>
        )}
      </div>
    );
  };
  export default CardView;