import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

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
    questions: Question[];
}

interface Props {
    game: Game;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Questions', href: '#' },
];

export default function ManageQuestions({ game }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        question_text: string;
        choices: { choice_text: string; is_correct: boolean }[];
    }>({
        question_text: '',
        choices: [
            { choice_text: '', is_correct: false },
            { choice_text: '', is_correct: false },
            { choice_text: '', is_correct: false },
            { choice_text: '', is_correct: false },
        ],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/api/v1/games/${game.id}/questions`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage Questions for ${game.title}`} />

            <div className="mx-auto mt-10 max-w-4xl space-y-8 rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold">Manage Questions for "{game.title}"</h1>

                {/* List Existing Questions */}
                {game.questions.length > 0 ? (
                    <ul className="space-y-4">
                        {game.questions.map((q) => (
                            <li key={q.id} className="rounded border border-gray-200 p-4 shadow-sm">
                                <h2 className="text-lg font-semibold">{q.question_text}</h2>
                                <ul className="mt-2 list-disc pl-5 text-sm">
                                    {q.choices.map((c, i) => (
                                        <li key={i} className={c.is_correct ? 'font-semibold text-green-600' : ''}>
                                            {c.choice_text} {c.is_correct && '(Correct)'}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">You haven’t added any questions yet.</p>
                )}

                {/* Add New Question Form */}
                <form onSubmit={handleSubmit} className="space-y-6 border-t pt-6">
                    <h2 className="text-lg font-semibold">Add New Question</h2>

                    <div>
                        <label htmlFor="question_text" className="mb-1 block text-sm font-medium">
                            Question Text
                        </label>
                        <input
                            type="text"
                            id="question_text"
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            value={data.question_text}
                            onChange={(e) => setData('question_text', e.target.value)}
                        />
                        {errors.question_text && <p className="mt-1 text-sm text-red-600">{errors.question_text}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {data.choices.map((choice, index) => (
                            <div key={index}>
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Add Question
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
