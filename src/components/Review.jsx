import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Sadia Rahman",
    role: "Member",
    review: "PulsePlay made booking courts so easy! The process is smooth, and I love the quick notifications.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arif Hossain",
    role: "Admin",
    review: "Managing court bookings is much simpler now. Approvals and member handling are very organized.",
    rating: 4,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "User",
    review: "I really like the dashboard design. Canceling and tracking bookings is very user-friendly.",
    rating: 5,
  },
  {
    id: 4,
    name: "Rakibul Islam",
    role: "Member",
    review: "The announcements and payment history features keep everything transparent and efficient.",
    rating: 4,
  },
];

export default function Review() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          What Our Users Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-2xl border dark:border-gray-500 text-left hover:shadow-lg transition"
            >
              <div className="flex items-center mb-3">
                {Array(review.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
              </div>
              <p className="text-gray-400 mb-4">"{review.review}"</p>
              <h4 className="text-lg font-semibold ">{review.name}</h4>
              <span className="text-sm dark:text-gray-300">{review.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

