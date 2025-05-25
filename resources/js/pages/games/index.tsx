import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Game {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
}

interface Props {
    games: Game[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
];

export default function GameIndex({ games }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Games" />

            <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold">Your Trivia Games</h1>

                {games.length === 0 ? (
                    <p className="text-gray-600">You haven’t created any games yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {games.map((game) => (
                            <li key={game.id} className="rounded border border-gray-200 p-4 shadow-sm hover:bg-gray-50">
                                <h2 className="text-lg font-semibold">{game.title}</h2>
                                <p className="text-sm text-gray-600">{game.description || 'No description provided'}</p>
                                <p className="mt-1 text-xs text-gray-400">Created: {new Date(game.created_at).toLocaleString()}</p>

                                <div className="mt-2 flex items-center gap-4">
                                    <Link href={`/games/${game.id}/edit`} className="text-sm text-blue-600 hover:underline">
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this game?')) {
                                                router.delete(`/games/${game.id}`);
                                            }
                                        }}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AppLayout>
    );
}
