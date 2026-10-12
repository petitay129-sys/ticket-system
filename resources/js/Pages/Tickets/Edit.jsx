import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ ticket }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Ticket #{ticket.id}
                </h2>
            }
        >
            <Head title="Edit Ticket" />
            <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            put(route("tickets.update", ticket.id));
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block font-medium text-sm text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.title && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium text-sm text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            ></textarea>
                            {errors.description && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Priority
                                </label>
                                <select
                                    value={data.priority}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    {["Low", "Medium", "High", "Urgent"].map(
                                        (p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    {[
                                        "Open",
                                        "In Progress",
                                        "Resolved",
                                        "Closed",
                                    ].map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium text-sm text-gray-700">
                                    Category
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    {[
                                        "Hardware",
                                        "Software",
                                        "Network",
                                        "Account",
                                        "Other",
                                    ].map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? "Updating..." : "Update Ticket"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
