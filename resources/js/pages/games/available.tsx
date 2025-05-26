import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Game {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
    questions_count: number;
}

interface Props {
    games: Game[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Play Games', href: '/play' },
];

export default function AvailableGames({ games }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Play Games" />

            <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Available Trivia Games</h1>
                    <p className="mt-2 text-lg text-gray-600">Choose a game to test your knowledge and compete with others</p>
                </div>

                {games.length === 0 ? (
                    /* Empty State */
                    <div className="py-16 text-center">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">No games available</h3>
                        <p className="text-gray-500">Check back later for new trivia games to play</p>
                    </div>
                ) : (
                    /* Games Grid */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {games.map((game) => (
                            <Link
                                key={game.id}
                                href={`/play/${game.id}`}
                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                            >
                                {/* Game Header */}
                                <div className="p-6">
                                    <div className="mb-3 flex items-start justify-between">
                                        <h2 className="flex-1 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                                            {game.title}
                                        </h2>
                                        <div className="ml-3 flex-shrink-0">
                                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                {game.questions_count} Question{game.questions_count !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="mb-4 text-sm leading-relaxed text-gray-600">{game.description || 'No description provided'}</p>

                                    <div className="flex items-center text-xs text-gray-400">
                                        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Created {new Date(game.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Play Button Footer */}
                                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 transition-colors group-hover:bg-blue-50">
                                    <div className="flex items-center justify-center text-sm font-medium text-blue-700 group-hover:text-blue-800">
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Start Playing
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
