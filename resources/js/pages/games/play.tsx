import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Choice {
    id: number;
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
    { title: 'Play', href: '/play' },
    { title: 'Play Quiz', href: '#' },
];

export default function PlayGame({ game }: Props) {
    const { data, setData, post, processing } = useForm<{
        answers: Record<number, number>; // question_id => choice_id
    }>({
        answers: {},
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/play/${game.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Play ${game.title}`} />

            <div className="mx-auto mt-10 max-w-3xl space-y-8 rounded-xl bg-white p-6 shadow">
                <h1 className="text-2xl font-bold">Quiz: {game.title}</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {game.questions.map((q) => (
                        <div key={q.id} className="space-y-2">
                            <h2 className="font-medium text-gray-800">{q.question_text}</h2>
                            <div className="ml-4 space-y-1">
                                {q.choices.map((c) => (
                                    <label key={c.id} className="block text-sm">
                                        <input
                                            type="radio"
                                            name={`question_${q.id}`}
                                            value={c.id}
                                            checked={data.answers[q.id] === c.id}
                                            onChange={() =>
                                                setData('answers', {
                                                    ...data.answers,
                                                    [q.id]: c.id,
                                                })
                                            }
                                            className="mr-2"
                                        />
                                        {c.choice_text}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Submit Answers
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
