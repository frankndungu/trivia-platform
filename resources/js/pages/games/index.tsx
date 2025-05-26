import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
    const [showModal, setShowModal] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [selectedGameTitle, setSelectedGameTitle] = useState<string>('');

    const openDeleteModal = (id: number, title: string) => {
        setSelectedGameId(id);
        setSelectedGameTitle(title);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (!selectedGameId) return;

        router.delete(`/games/${selectedGameId}`, {
            onSuccess: () => {
                toast.success('Game deleted successfully');
                setShowModal(false);
                setSelectedGameId(null);
                setSelectedGameTitle('');
            },
            onError: () => {
                toast.error('Failed to delete game');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Games" />

            <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your Trivia Games</h1>
                    <p className="mt-2 text-lg text-gray-600">Manage your trivia games, questions, and invite players</p>
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
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">No games yet</h3>
                        <p className="mb-6 text-gray-500">Get started by creating your first trivia game</p>
                        <Link
                            href="/games/create"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                        >
                            Create Your First Game
                        </Link>
                    </div>
                ) : (
                    /* Games Grid */
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                            >
                                {/* Game Header */}
                                <div className="border-b border-gray-100 p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h2 className="mb-2 text-xl font-semibold text-gray-900">{game.title}</h2>
                                            <p className="text-sm leading-relaxed text-gray-600">{game.description || 'No description provided'}</p>
                                            <div className="mt-3 flex items-center text-xs text-gray-400">
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

                                        {/* Question Count Badge */}
                                        <div className="ml-4 flex-shrink-0">
                                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                {game.questions?.length || 0} Question{(game.questions?.length || 0) === 1 ? '' : 's'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            href={`/games/${game.id}/edit`}
                                            className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-100"
                                        >
                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                            Edit Game
                                        </Link>

                                        <Link
                                            href={`/games/${game.id}/invite`}
                                            className="inline-flex items-center rounded-md bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 transition-colors duration-200 hover:bg-purple-100"
                                        >
                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                                />
                                            </svg>
                                            Invite Players
                                        </Link>

                                        <Link
                                            href={`/games/${game.id}/questions`}
                                            className="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition-colors duration-200 hover:bg-green-100"
                                        >
                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add Question
                                        </Link>

                                        <button
                                            onClick={() => openDeleteModal(game.id, game.title)}
                                            className="inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors duration-200 hover:bg-red-100"
                                        >
                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {/* Questions List */}
                                {game.questions && game.questions.length > 0 && (
                                    <div className="p-6">
                                        <h3 className="mb-4 flex items-center text-sm font-semibold text-gray-900">
                                            <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Questions
                                        </h3>
                                        <div className="max-h-80 space-y-4 overflow-y-auto">
                                            {game.questions.map((q) => (
                                                <div key={q.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                    <div className="mb-3 flex items-start justify-between">
                                                        <p className="flex-1 pr-4 text-sm leading-relaxed font-medium text-gray-900">
                                                            {q.question_text}
                                                        </p>
                                                        <Link
                                                            href={`/questions/${q.id}/edit`}
                                                            className="flex-shrink-0 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                                                        >
                                                            Manage
                                                        </Link>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                        {q.choices.map((c, i) => (
                                                            <div
                                                                key={i}
                                                                className={`rounded-md border px-3 py-2 text-xs ${
                                                                    c.is_correct
                                                                        ? 'border-green-200 bg-green-50 font-medium text-green-800'
                                                                        : 'border-gray-200 bg-white text-gray-700'
                                                                }`}
                                                            >
                                                                <div className="flex items-center">
                                                                    {c.is_correct && (
                                                                        <svg
                                                                            className="mr-1 h-3 w-3 text-green-600"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    )}
                                                                    <span className="truncate">{c.choice_text}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="bg-opacity-25 fixed inset-0 backdrop-blur-xs transition-opacity" onClick={() => setShowModal(false)}></div>

                        <div className="relative mx-auto w-full max-w-md transform rounded-lg bg-white shadow-xl transition-all">
                            <div className="p-6">
                                <div className="mb-4 flex items-center">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Delete Game</h3>
                                    <p className="mb-6 text-sm text-gray-600">
                                        Are you sure you want to delete <span className="font-medium text-gray-900">"{selectedGameTitle}"</span>?
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
                                    >
                                        Delete Game
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
