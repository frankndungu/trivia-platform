import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
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
    questions: Question[];
}

interface Props {
    game: Game;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Add Questions', href: '#' },
];

export default function ManageQuestions({ game }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
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
        post(`/games/${game.id}/questions`, {
            onSuccess: () => {
                toast.success('Question added successfully');
                setData({
                    question_text: '',
                    choices: [
                        { choice_text: '', is_correct: false },
                        { choice_text: '', is_correct: false },
                        { choice_text: '', is_correct: false },
                        { choice_text: '', is_correct: false },
                    ],
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage Questions for ${game.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Add Questions</h1>
                        <p className="text-lg text-gray-600">Questions for "{game.title}"</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Existing Questions */}
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                                <h2 className="flex items-center text-lg font-semibold text-white">
                                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    Existing Questions ({game.questions.length})
                                </h2>
                            </div>

                            <div className="max-h-96 overflow-y-auto p-6">
                                {game.questions.length > 0 ? (
                                    <div className="space-y-4">
                                        {game.questions.map((q, idx) => (
                                            <div key={q.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="mb-3 flex items-start justify-between">
                                                    <h3 className="text-sm font-semibold text-gray-900">{q.question_text}</h3>
                                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">#{idx + 1}</span>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {q.choices.map((c, i) => (
                                                        <div
                                                            key={i}
                                                            className={`flex items-center rounded px-2 py-1 text-xs ${c.is_correct ? 'bg-green-100 font-medium text-green-800' : 'bg-white text-gray-600'}`}
                                                        >
                                                            <span className="mr-2 font-medium">{String.fromCharCode(65 + i)}.</span>
                                                            {c.choice_text}
                                                            {c.is_correct && (
                                                                <svg className="ml-auto h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-500">No questions added yet</p>
                                        <p className="text-xs text-gray-400">Start by adding your first question</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Add New Question Form */}
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                                <h2 className="flex items-center text-lg font-semibold text-white">
                                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Question
                                </h2>
                                <p className="mt-1 text-sm text-blue-100">Create a new trivia question</p>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Question Text */}
                                    <div className="space-y-2">
                                        <label htmlFor="question_text" className="flex items-center text-sm font-semibold text-gray-900">
                                            <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Question Text
                                            <span className="ml-1 text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="question_text"
                                            rows={3}
                                            placeholder="Enter your trivia question here..."
                                            className={`w-full resize-none rounded-lg border-2 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                                errors.question_text
                                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            value={data.question_text}
                                            onChange={(e) => setData('question_text', e.target.value)}
                                        />
                                        {errors.question_text && (
                                            <div className="mt-2 flex items-center">
                                                <svg className="mr-2 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <p className="text-sm text-red-600">{errors.question_text}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Answer Choices */}
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                />
                                            </svg>
                                            <h3 className="text-sm font-semibold text-gray-900">Answer Choices</h3>
                                            <span className="ml-2 text-xs text-gray-500">(Select the correct answer)</span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {data.choices.map((choice, index) => (
                                                <div
                                                    key={index}
                                                    className={`rounded-lg border-2 p-3 transition-all duration-200 ${choice.is_correct ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                                                >
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <label className="text-sm font-medium text-gray-700">
                                                            Choice {String.fromCharCode(65 + index)}
                                                        </label>
                                                        <label className="inline-flex items-center">
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
                                                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                                                            />
                                                            <span className="ml-2 text-xs text-gray-600">Correct</span>
                                                        </label>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder={`Enter choice ${String.fromCharCode(65 + index)}...`}
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                        value={choice.choice_text}
                                                        onChange={(e) => {
                                                            const updated = [...data.choices];
                                                            updated[index].choice_text = e.target.value;
                                                            setData('choices', updated);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="border-t border-gray-100 pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing || !data.question_text.trim()}
                                            className={`inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                                                processing || !data.question_text.trim()
                                                    ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                                                    : 'transform bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                            }`}
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="mr-2 -ml-1 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Adding Question...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        />
                                                    </svg>
                                                    Add Question
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
