import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";

export default function Index({ tickets }) {
    const { flash } = usePage().props;

    const deleteTicket = (id) => {
        if (confirm("Are you sure you want to delete this ticket?")) {
            router.delete(route("tickets.destroy", id));
        }
    };

    const getPriorityBadge = (p) => {
        const c = {
            Low: "bg-gray-100 text-gray-800",
            Medium: "bg-blue-100 text-blue-800",
            High: "bg-yellow-100 text-yellow-800",
            Urgent: "bg-red-100 text-red-800",
        };
        return (
            <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${c[p]}`}
            >
                {p}
            </span>
        );
    };

    const getStatusBadge = (s) => {
        const c = {
            Open: "bg-blue-100 text-blue-800",
            "In Progress": "bg-purple-100 text-purple-800",
            Resolved: "bg-green-100 text-green-800",
            Closed: "bg-gray-100 text-gray-800",
        };
        return (
            <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${c[s]}`}
            >
                {s}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        My Tickets
                    </h2>
                    <Link
                        href={route("tickets.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                    >
                        New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {flash.success && (
                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    {tickets.data.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">
                                No tickets found. Get started by creating your
                                first support ticket.
                            </p>
                            <Link
                                href={route("tickets.create")}
                                className="text-blue-600 underline font-medium"
                            >
                                Create a Ticket
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Priority
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {tickets.data.map((t) => (
                                            <tr key={t.id}>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                    <Link
                                                        href={route(
                                                            "tickets.show",
                                                            t.id
                                                        )}
                                                        className="hover:text-blue-600"
                                                    >
                                                        {t.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {t.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getPriorityBadge(
                                                        t.priority
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(t.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                                    <Link
                                                        href={route(
                                                            "tickets.edit",
                                                            t.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            deleteTicket(t.id)
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Stacked Cards */}
                            <div className="md:hidden space-y-4">
                                {tickets.data.map((t) => (
                                    <div
                                        key={t.id}
                                        className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
                                    >
                                        <div className="flex justify-between items-start">
                                            <Link
                                                href={route(
                                                    "tickets.show",
                                                    t.id
                                                )}
                                                className="font-semibold text-gray-900 hover:text-blue-600"
                                            >
                                                {t.title}
                                            </Link>
                                            {getStatusBadge(t.status)}
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Category: {t.category}</span>
                                            <span>
                                                {getPriorityBadge(t.priority)}
                                            </span>
                                        </div>
                                        <div className="flex justify-end space-x-3 pt-2 border-t text-sm">
                                            <Link
                                                href={route(
                                                    "tickets.edit",
                                                    t.id
                                                )}
                                                className="text-indigo-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    deleteTicket(t.id)
                                                }
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Links */}
                            <div className="mt-6 flex flex-wrap gap-1">
                                {tickets.links.map((l, i) => (
                                    <Link
                                        key={i}
                                        href={l.url || "#"}
                                        dangerouslySetInnerHTML={{
                                            __html: l.label,
                                        }}
                                        className={`px-3 py-1 border rounded text-sm ${
                                            l.active
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-700"
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
