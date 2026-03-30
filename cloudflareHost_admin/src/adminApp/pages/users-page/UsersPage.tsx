import { useState } from "react";
import { useInfiniteUsers, useUserStats, type User } from "../../component/hook/useUsers";
import { CalendarIcon, SearchIcon, UserPlusIcon, UsersIcon } from "../../component/svgIcons/SvgIcons";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const { data: stats, isLoading: statsLoading } = useUserStats();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteUsers(search);

  const allUsers = data?.pages?.flatMap((page) => page.users) || [];

  return (
    <div className="min-h-screen px-5 py-30 2xl:py-20 2xl:pb-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
            მომხმარებლები
          </h1>
          <p className="text-gray-300 text-lg">სისტემაში დარეგისტრირებული იუზერების მართვა</p>
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          <div className="bg-gray-800 border border-violet-500/30 rounded-3xl p-8 shadow-xl shadow-violet-500/10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                <UsersIcon />
              </div>
              <div>
                <p className="text-gray-400 text-sm">საერთო რაოდენობა</p>
                <p className="text-5xl font-bold text-white mt-2 tracking-tighter">
                  {statsLoading ? "—" : stats?.total?.toLocaleString("ka-GE") || "0"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-emerald-500/30 rounded-3xl p-8 shadow-xl shadow-emerald-500/10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-inner">
                <UserPlusIcon />
              </div>
              <div>
                <p className="text-gray-400 text-sm">ბოლო 7 დღეში</p>
                <p className="text-5xl font-bold text-emerald-400 mt-2 tracking-tighter">
                  {statsLoading ? "—" : stats?.last7Days || "0"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-amber-500/30 rounded-3xl p-8 shadow-xl shadow-amber-500/10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-inner">
                <CalendarIcon />
              </div>
              <div>
                <p className="text-gray-400 text-sm">ბოლო 30 დღეში</p>
                <p className="text-5xl font-bold text-amber-400 mt-2 tracking-tighter">
                  {statsLoading ? "—" : stats?.last30Days || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="ძებნა სახელით ან გვარით..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-700 border-2 border-blue-700 rounded-3xl 
                       text-white text-lg focus:border-blue-800 focus:ring-green-600 
                       placeholder-gray-500 transition-all"
          />
        </div>

        <div className="bg-gray-800 border border-gray-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-950">
                  <th className="px-8 py-6 text-left font-semibold text-gray-200">სახელი და გვარი</th>
                  <th className="px-8 py-6 text-left font-semibold text-gray-200">რეგისტრაციის თარიღი</th>
                  <th className="px-8 py-6 text-center font-semibold text-gray-200">სტატუსი</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {allUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-8 py-6 font-medium text-white text-lg">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-8 py-6 text-gray-400">
                      {new Date(user.created_at).toLocaleDateString("ka-GE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={`inline-flex px-6 py-2.5 rounded-3xl text-sm font-medium border ${
                          user.isVerified
                            ? "bg-emerald-900/80 text-emerald-300 border-emerald-600"
                            : "bg-amber-900/80 text-amber-300 border-amber-600"
                        }`}
                      >
                        {user.isVerified ? "✓ ვერიფიცირებული" : "○ არა ვერიფიცირებული"}
                      </span>
                    </td>
                  </tr>
                ))}

                {allUsers.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={3} className="py-20 text-center text-gray-500">
                      მომხმარებელი ვერ მოიძებნა
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {hasNextPage && (
            <div className="flex justify-center py-10 border-t border-gray-700">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-12 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-3xl transition-all shadow-lg"
              >
                {isFetchingNextPage ? "იტვირთება..." : "კიდევ 20 იუზერის ჩატვირთვა"}
              </button>
            </div>
          )}

          {isLoading && <div className="py-16 text-center text-gray-500">იტვირთება...</div>}
        </div>
      </div>
    </div>
  );
}