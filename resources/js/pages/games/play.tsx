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

    const answeredQuestions = Object.keys(data.answers).length;
    const totalQuestions = game.questions.length;
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Play ${game.title}`} />

            <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{game.title}</h1>
                    <p className="mt-2 text-lg text-gray-600">Answer all questions to complete the quiz</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">
                            {answeredQuestions} of {totalQuestions} questions answered
                        </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
                    </div>
                </div>

                {/* Quiz Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                        {game.questions.map((q, index) => (
                            <div key={q.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                {/* Question Header */}
                                <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                    <div className="flex items-start">
                                        <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800">
                                            {index + 1}
                                        </div>
                                        <h2 className="flex-1 text-lg leading-relaxed font-semibold text-gray-900">{q.question_text}</h2>
                                        {data.answers[q.id] && (
                                            <div className="ml-4 flex-shrink-0">
                                                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Answer Choices */}
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {q.choices.map((c, choiceIndex) => {
                                            const isSelected = data.answers[q.id] === c.id;
                                            const choiceLabel = String.fromCharCode(65 + choiceIndex); // A, B, C, D

                                            return (
                                                <label
                                                    key={c.id}
                                                    className={`group flex cursor-pointer items-start rounded-lg border-2 p-4 transition-all duration-200 hover:bg-blue-50 ${
                                                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`question_${q.id}`}
                                                        value={c.id}
                                                        checked={isSelected}
                                                        onChange={() =>
                                                            setData('answers', {
                                                                ...data.answers,
                                                                [q.id]: c.id,
                                                            })
                                                        }
                                                        className="sr-only"
                                                    />
                                                    <div className="mr-3 flex-shrink-0">
                                                        <div
                                                            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors ${
                                                                isSelected
                                                                    ? 'border-blue-500 bg-blue-500 text-white'
                                                                    : 'border-gray-300 bg-white text-gray-500 group-hover:border-blue-400'
                                                            }`}
                                                        >
                                                            {choiceLabel}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <span
                                                            className={`text-sm leading-relaxed ${
                                                                isSelected ? 'font-medium text-gray-900' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            {c.choice_text}
                                                        </span>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="text-sm text-gray-600">
                                {answeredQuestions === totalQuestions ? (
                                    <span className="flex items-center text-green-600">
                                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        All questions answered
                                    </span>
                                ) : (
                                    `${totalQuestions - answeredQuestions} question${totalQuestions - answeredQuestions !== 1 ? 's' : ''} remaining`
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing || answeredQuestions === 0}
                                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Submit Answers
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
