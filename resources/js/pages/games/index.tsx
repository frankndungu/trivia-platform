import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Choice {
    choice_text: string;
    is_correct: boolean;
}

interface Question {
    id: number;
    question_text: string;
    choices: Choice[];
}

interface Game {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
    questions?: Question[];
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
                    <ul className="space-y-6">
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

                                {/* Show questions + choices */}
                                {game.questions && game.questions.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-semibold text-gray-700">
                                            {game.questions.length} Question{game.questions.length === 1 ? '' : 's'}
                                        </h3>
                                        <ul className="mt-2 space-y-2 text-sm">
                                            {game.questions.map((q) => (
                                                <li key={q.id} className="rounded border bg-gray-50 p-3">
                                                    <p className="font-medium text-gray-800">{q.question_text}</p>
                                                    <ul className="mt-1 ml-4 list-disc text-gray-700">
                                                        {q.choices.map((c, i) => (
                                                            <li key={i} className={c.is_correct ? 'font-semibold text-green-600' : ''}>
                                                                {c.choice_text} {c.is_correct && '(Correct)'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AppLayout>
    );
}
