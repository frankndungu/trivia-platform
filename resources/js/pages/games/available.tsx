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

            <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-0">
                <h1 className="mb-6 text-center text-2xl font-bold">Available Trivia Games</h1>

                {games.length === 0 ? (
                    <p className="text-center text-gray-500">No games available at the moment.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {games.map((game) => (
                            <Link
                                key={game.id}
                                href={`/play/${game.id}`}
                                className="block rounded-xl border border-gray-200 bg-white p-4 shadow transition hover:shadow-md"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">{game.title}</h2>
                                <p className="mt-1 text-sm text-gray-600">{game.description || 'No description provided'}</p>
                                <p className="mt-2 text-xs text-gray-400">Created: {new Date(game.created_at).toLocaleString()}</p>
                                <p className="mt-1 text-sm font-medium text-indigo-600">
                                    {game.questions_count} question{game.questions_count !== 1 ? 's' : ''}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
