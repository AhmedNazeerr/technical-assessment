"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const mockData = [
  {
    username: "alice.eth",
    type: "Stake",
    token: "ETH",
    amount: 1.2,
    date: "2025-04-09",
  },
  {
    username: "bob.eth",
    type: "Borrow",
    token: "USDC",
    amount: 500,
    date: "2025-04-08",
  },
  {
    username: "carol.eth",
    type: "Lend",
    token: "DAI",
    amount: 300,
    date: "2025-04-07",
  },
  {
    username: "dan.eth",
    type: "Stake",
    token: "ETH",
    amount: 0.75,
    date: "2025-04-06",
  },
  {
    username: "eve.eth",
    type: "Lend",
    token: "DAI",
    amount: 800,
    date: "2025-04-05",
  },
];

const filters = ["All", "Stake", "Borrow", "Lend"];

const RecentTransactions = () => {
  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All" ? mockData : mockData.filter((tx) => tx.type === filter);

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Recent Transactions
      </h2>

      {/* filter buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              "px-4 py-2 rounded-md text-sm font-medium transition",
              f === filter
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* transaction table */}
      <div className="overflow-x-auto">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-w-full table-auto text-sm border-4 border-white rounded-md overflow-hidden"
        >
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2 text-left border border-white">Username</th>
              <th className="px-4 py-2 text-left border border-white">Type</th>
              <th className="px-4 py-2 text-left border border-white">Token</th>
              <th className="px-4 py-2 text-left border border-white">Amount</th>
              <th className="px-4 py-2 text-left border border-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((tx, index) => (
              <tr
                key={index}
                className="bg-black-100"
              >
                <td className="px-4 py-2 border border-white">{tx.username}</td>
                <td className="px-4 py-2 border border-white">{tx.type}</td>
                <td className="px-4 py-2 border border-white">{tx.token}</td>
                <td className="px-4 py-2 border border-white">{tx.amount}</td>
                <td className="px-4 py-2 border border-white">{tx.date}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-g-yellow00 border border-white">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default RecentTransactions;