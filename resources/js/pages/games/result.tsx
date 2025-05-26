import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Game {
    id: number;
    title: string;
}

interface Score {
    correct: number;
    total: number;
    percentage: number;
}

interface Props {
    game: Game;
    score: Score;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Play Games', href: '/play' },
];

export default function QuizResult({ game, score }: Props) {
    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600';
        if (percentage >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (percentage: number) => {
        if (percentage >= 80) return 'bg-green-50 border-green-200';
        if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
        return 'bg-red-50 border-red-200';
    };

    const getScoreMessage = (percentage: number) => {
        if (percentage >= 90) return 'Outstanding! 🎉';
        if (percentage >= 80) return 'Great job! 👏';
        if (percentage >= 70) return 'Well done! 👍';
        if (percentage >= 60) return 'Good effort! 💪';
        if (percentage >= 50) return 'Keep practicing! 📚';
        return 'Better luck next time! 🤗';
    };

    const getScoreIcon = (percentage: number) => {
        if (percentage >= 80) {
            return (
                <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        }
        if (percentage >= 60) {
            return (
                <svg className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>
            );
        }
        return (
            <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz Result" />

            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Quiz Complete!</h1>
                    <p className="mt-2 text-lg text-gray-600">Here's how you performed</p>
                </div>

                {/* Results Card */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {/* Game Title Header */}
                    <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                        <div className="flex items-center justify-center">
                            <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{game.title}</h2>
                        </div>
                    </div>

                    {/* Score Display */}
                    <div className="p-8 text-center">
                        {/* Score Icon */}
                        <div className="mb-6 flex justify-center">{getScoreIcon(score.percentage)}</div>

                        {/* Score Message */}
                        <div className="mb-6">
                            <h3 className="mb-2 text-2xl font-bold text-gray-900">{getScoreMessage(score.percentage)}</h3>
                            <p className="text-gray-600">You've completed the quiz</p>
                        </div>

                        {/* Score Details */}
                        <div className={`mx-auto mb-6 max-w-md rounded-lg border-2 p-6 ${getScoreBgColor(score.percentage)}`}>
                            <div className="mb-4">
                                <div className={`text-4xl font-bold ${getScoreColor(score.percentage)}`}>{score.percentage}%</div>
                                <div className="mt-1 text-sm text-gray-600">Overall Score</div>
                            </div>

                            <div className="flex items-center justify-center space-x-8 text-sm">
                                <div className="text-center">
                                    <div className="font-semibold text-green-600">{score.correct}</div>
                                    <div className="text-gray-500">Correct</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-red-600">{score.total - score.correct}</div>
                                    <div className="text-gray-500">Incorrect</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-gray-700">{score.total}</div>
                                    <div className="text-gray-500">Total</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mx-auto mb-8 max-w-md">
                            <div className="mb-2 flex justify-between text-sm text-gray-600">
                                <span>Progress</span>
                                <span>
                                    {score.correct}/{score.total} questions
                                </span>
                            </div>
                            <div className="h-3 w-full rounded-full bg-gray-200">
                                <div
                                    className={`h-3 rounded-full transition-all duration-500 ${
                                        score.percentage >= 80 ? 'bg-green-500' : score.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${score.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-100 bg-gray-50 px-6 py-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href={`/play/${game.id}`}
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Try Again
                            </Link>

                            <Link
                                href="/play"
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                            >
                                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                Back to Games
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Share Section */}
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Share Your Achievement</h3>
                    <p className="mb-4 text-sm text-gray-600">
                        You scored {score.percentage}% on "{game.title}"
                    </p>
                    <div className="flex justify-center gap-3">
                        <button className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                            </svg>
                            Share Result
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
