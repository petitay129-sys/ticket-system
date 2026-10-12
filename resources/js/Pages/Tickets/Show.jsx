import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ ticket }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ticket Details #{ticket.id}
                </h2>
            }
        >
            <Head title={`Ticket #${ticket.id}`} />
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {ticket.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                            Created:{" "}
                            {new Date(ticket.created_at).toLocaleString()}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-y py-4 text-sm">
                        <div>
                            <span className="font-semibold">Category:</span>{" "}
                            {ticket.category}
                        </div>
                        <div>
                            <span className="font-semibold">Priority:</span>{" "}
                            {ticket.priority}
                        </div>
                        <div>
                            <span className="font-semibold">Status:</span>{" "}
                            {ticket.status}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">
                            Description
                        </h4>
                        <p className="text-gray-600 whitespace-pre-wrap">
                            {ticket.description}
                        </p>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                        <Link
                            href={route("tickets.index")}
                            className="text-blue-600 underline text-sm"
                        >
                            Back to Tickets
                        </Link>
                        <Link
                            href={route("tickets.edit", ticket.id)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                            Edit Ticket
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
