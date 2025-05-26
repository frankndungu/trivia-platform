import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Leader {
    user: string;
    games_played: number;
    percentage: number;
}

interface Props {
    leaders: Leader[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leaderboard', href: '/leaderboard' },
];

export default function Leaderboard({ leaders }: Props) {
    const getRankBadge = (index: number) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}`;
    };

    const getRankStyle = (index: number) => {
        if (index === 0) return 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-300';
        if (index === 1) return 'bg-gradient-to-br from-gray-100 to-slate-100 border-gray-300';
        if (index === 2) return 'bg-gradient-to-br from-orange-100 to-amber-100 border-orange-300';
        return 'bg-white border-gray-200';
    };

    const getScoreColor = (percentage: number) => {
        if (percentage >= 90) return 'text-emerald-600 bg-emerald-50';
        if (percentage >= 80) return 'text-blue-600 bg-blue-50';
        if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leaderboard" />

            <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100">
                        <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Global Leaderboard</h1>
                    <p className="mt-4 text-xl text-gray-600">See how you rank among all trivia champions</p>
                </div>

                {leaders.length === 0 ? (
                    /* Empty State */
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="py-24 text-center">
                            <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100">
                                <svg className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">No competitors yet</h3>
                            <p className="text-lg text-gray-500">Be the first to complete some quizzes and claim the top spot!</p>
                        </div>
                    </div>
                ) : (
                    /* Leaderboard */
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Top Performers</h2>
                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                                {leaders.length} Competitor{leaders.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="grid gap-4">
                            {leaders.map((leader, index) => (
                                <div
                                    key={index}
                                    className={`group overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-lg ${getRankStyle(index)}`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                {/* Rank Badge */}
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                                                    <span className="text-2xl font-bold text-gray-800">{getRankBadge(index)}</span>
                                                </div>

                                                {/* User Info */}
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900">{leader.user}</h3>
                                                    <div className="mt-1 flex items-center text-gray-600">
                                                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                            />
                                                        </svg>
                                                        <span className="font-medium">
                                                            {leader.games_played} Game{leader.games_played !== 1 ? 's' : ''} Played
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Score Display */}
                                            <div className="text-right">
                                                <div className="text-sm font-medium tracking-wide text-gray-500 uppercase">Average Score</div>
                                                <div className="mt-2">
                                                    <span
                                                        className={`inline-flex items-center rounded-xl px-6 py-3 text-3xl font-bold ${getScoreColor(leader.percentage)}`}
                                                    >
                                                        {leader.percentage}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-6">
                                            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000"
                                                    style={{ width: `${leader.percentage}%` }}
                                                ></div>
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
