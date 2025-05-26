import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
            onSuccess: () => {
                toast.success('Question deleted successfully');
                router.visit(`/games/${question.game_id}/questions`, {
                    preserveScroll: true,
                });
            },
            onError: () => {
                toast.error('Failed to delete question');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Question" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Edit Question</h1>
                        <p className="text-lg text-gray-600">Modify your trivia question and answer choices</p>
                    </div>

                    {/* Main Form Card */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                            <h2 className="flex items-center text-xl font-semibold text-white">
                                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Question Details
                            </h2>
                            <p className="mt-1 text-sm text-blue-100">Update your question text and answer choices</p>
                        </div>

                        {/* Form Content */}
                        <div className="px-8 py-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Question Text Field */}
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

                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        {data.choices.map((choice, index) => (
                                            <div
                                                key={choice.id}
                                                className={`rounded-lg border-2 p-4 transition-all duration-200 ${choice.is_correct ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <label className="text-sm font-medium text-gray-700">Choice {index + 1}</label>
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
                                                    placeholder={`Enter choice ${index + 1}...`}
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

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                        className="inline-flex items-center justify-center rounded-lg border-2 border-red-300 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        Delete Question
                                    </button>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={processing || !data.question_text.trim()}
                                            className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 ${
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
                                                    Saving Changes...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Delete Question</h3>
                            <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this question? This action cannot be undone.</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
