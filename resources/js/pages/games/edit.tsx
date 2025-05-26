import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Game {
    id: number;
    title: string;
    description: string | null;
}

interface Props {
    game: Game;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Edit Game', href: '#' },
];

export default function EditGame({ game }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: game.title || '',
        description: game.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/games/${game.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Game" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Edit Trivia Game</h1>
                        <p className="text-lg text-gray-600">Update your game details and settings</p>
                    </div>

                    {/* Main Form Card */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                            <h2 className="flex items-center text-xl font-semibold text-white">
                                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Game Details
                            </h2>
                            <p className="mt-1 text-sm text-blue-100">Modify the information for your trivia game</p>
                        </div>

                        {/* Form Content */}
                        <div className="px-8 py-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Game Title Field */}
                                <div className="space-y-2">
                                    <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-900">
                                        <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                            />
                                        </svg>
                                        Game Title
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="title"
                                            placeholder="Enter an engaging title for your trivia game..."
                                            className={`w-full rounded-lg border-2 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                                errors.title
                                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        {data.title && (
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {errors.title && (
                                        <div className="mt-2 flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p className="text-sm text-red-600">{errors.title}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div className="space-y-2">
                                    <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-900">
                                        <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        Description
                                        <span className="ml-2 text-xs font-normal text-gray-400">(optional)</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="description"
                                            rows={4}
                                            placeholder="Provide a brief description of your trivia game, its theme, or what players can expect..."
                                            className={`w-full resize-none rounded-lg border-2 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                                errors.description
                                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        <div className="absolute right-3 bottom-3 text-xs text-gray-400">{data.description.length}/500</div>
                                    </div>
                                    {errors.description && (
                                        <div className="mt-2 flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p className="text-sm text-red-600">{errors.description}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={processing || !data.title.trim()}
                                        className={`inline-flex flex-1 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 sm:flex-none ${
                                            processing || !data.title.trim()
                                                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                                                : 'transform bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                        }`}
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="mr-2 -ml-1 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Save Changes
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="inline-flex flex-1 items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:flex-none"
                                    >
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
