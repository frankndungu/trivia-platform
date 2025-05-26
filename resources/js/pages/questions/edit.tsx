import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Choice {
    id: number;
    choice_text: string;
    is_correct: boolean;
}

interface Question {
    id: number;
    question_text: string;
    choices: Choice[];
    game_id: number;
}

interface Props {
    question: Question;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Edit Question', href: '#' },
];

export default function EditQuestion({ question }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        question_text: question.question_text,
        choices: question.choices.map((c) => ({
            id: c.id,
            choice_text: c.choice_text,
            is_correct: c.is_correct,
        })),
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/questions/${question.id}`, {
            onSuccess: () =>
                router.visit(`/games/${question.game_id}/questions`, {
                    preserveScroll: true,
                }),
        });
    };

    const handleDelete = () => {
        router.delete(`/questions/${question.id}`, {
            onSuccess: () =>
                router.visit(`/games/${question.game_id}/questions`, {
                    preserveScroll: true,
                }),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Question" />

            <div className="mx-auto mt-10 max-w-2xl space-y-8 rounded-xl bg-white p-6 shadow">
                <h1 className="text-2xl font-bold">Edit Question</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="question_text" className="mb-1 block text-sm font-medium">
                            Question
                        </label>
                        <input
                            type="text"
                            id="question_text"
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            value={data.question_text}
                            onChange={(e) => setData('question_text', e.target.value)}
                        />
                        {errors.question_text && <p className="text-sm text-red-600">{errors.question_text}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {data.choices.map((choice, index) => (
                            <div key={choice.id}>
                                <label className="mb-1 block text-sm font-medium">Choice {index + 1}</label>
                                <input
                                    type="text"
                                    className="mb-1 w-full rounded border border-gray-300 px-3 py-2"
                                    value={choice.choice_text}
                                    onChange={(e) => {
                                        const updated = [...data.choices];
                                        updated[index].choice_text = e.target.value;
                                        setData('choices', updated);
                                    }}
                                />
                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="correct_choice"
                                        checked={choice.is_correct}
                                        onChange={() => {
                                            const updated = data.choices.map((c, i) => ({
                                                ...c,
                                                is_correct: i === index,
                                            }));
                                            setData('choices', updated);
                                        }}
                                    />
                                    Mark as correct
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Save Changes
                        </button>

                        <button type="button" onClick={() => setShowModal(true)} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                            Delete Question
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this question? This action cannot be undone.</p>

                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
