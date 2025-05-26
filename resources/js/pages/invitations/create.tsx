import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface Game {
    id: number;
    title: string;
}

interface Props {
    game: Game;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Invite', href: '#' },
];

export default function InviteUser({ game }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/games/${game.id}/invite`, {
            onSuccess: () => {
                toast.success('Invitation sent successfully');
                setData('email', '');
            },
            onError: () => {
                toast.error('Failed to send invitation');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Invite to ${game.title}`} />

            <div className="min-h-screen py-8">
                <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-2xl font-bold text-gray-900">Invite Player</h1>
                        <p className="text-gray-600">Send an invitation to join "{game.title}"</p>
                    </div>

                    {/* Main Form Card */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                            <h2 className="flex items-center text-lg font-semibold text-white">
                                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Send Invitation
                            </h2>
                        </div>

                        {/* Form Content */}
                        <div className="px-6 py-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-900">
                                        <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                        Email Address
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter player's email address..."
                                            className={`w-full rounded-lg border-2 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                                errors.email
                                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {data.email && (
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
                                    {errors.email && (
                                        <div className="mt-2 flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <p className="text-sm text-red-600">{errors.email}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        disabled={processing || !data.email.trim()}
                                        className={`inline-flex flex-1 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 sm:flex-none ${
                                            processing || !data.email.trim()
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
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </svg>
                                                Send Invitation
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
