import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Attempt {
    id: number;
    score: number;
    total: number;
    created_at: string;
    game: {
        title: string;
    };
}

interface Props {
    attempts: Attempt[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ attempts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-4 text-xl text-gray-600">Track your quiz performance and progress</p>
                </div>

                {attempts.length === 0 ? (
                    /* Empty State */
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="py-24 text-center">
                            <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100">
                                <svg className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">No quiz attempts yet</h3>
                            <p className="text-lg text-gray-500">Start playing some trivia games to see your results here</p>
                        </div>
                    </div>
                ) : (
                    /* Recent Quiz Attempts */
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Recent Quiz Attempts</h2>
                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                                {attempts.length} Attempt{attempts.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="grid gap-6">
                            {attempts.map((attempt) => (
                                <div
                                    key={attempt.id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-lg"
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                    {attempt.game.title}
                                                </h3>
                                                <div className="mt-3 flex items-center text-gray-500">
                                                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <span className="text-base">
                                                        Completed on{' '}
                                                        {new Date(attempt.created_at).toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="ml-8 flex items-center space-x-6">
                                                <div className="text-center">
                                                    <div className="text-sm font-medium tracking-wide text-gray-500 uppercase">Score</div>
                                                    <div className="mt-1 text-3xl font-bold text-gray-900">
                                                        {attempt.score}
                                                        <span className="text-xl text-gray-500">/{attempt.total}</span>
                                                    </div>
                                                </div>

                                                <div className="h-16 w-px bg-gray-200"></div>

                                                <div className="text-center">
                                                    <div className="text-sm font-medium tracking-wide text-gray-500 uppercase">Accuracy</div>
                                                    <div className="mt-1">
                                                        <span
                                                            className={`inline-flex items-center rounded-xl px-4 py-2 text-2xl font-bold ${
                                                                Math.round((attempt.score / attempt.total) * 100) >= 80
                                                                    ? 'bg-emerald-100 text-emerald-700'
                                                                    : Math.round((attempt.score / attempt.total) * 100) >= 60
                                                                      ? 'bg-blue-100 text-blue-700'
                                                                      : 'bg-red-100 text-red-700'
                                                            }`}
                                                        >
                                                            {Math.round((attempt.score / attempt.total) * 100)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
