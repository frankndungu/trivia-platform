import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Choice {
    id: number;
    choice_text: string;
    is_correct: boolean;
}

interface Props {
    choice: Choice;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Edit Choice', href: '#' },
];

export default function EditChoice({ choice }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        choice_text: choice.choice_text,
        is_correct: choice.is_correct,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/choices/${choice.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Choice" />

            <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold">Edit Choice</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="choice_text" className="mb-1 block text-sm font-medium">
                            Choice Text
                        </label>
                        <input
                            type="text"
                            id="choice_text"
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            value={data.choice_text}
                            onChange={(e) => setData('choice_text', e.target.value)}
                        />
                        {errors.choice_text && <p className="mt-1 text-sm text-red-600">{errors.choice_text}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="is_correct" checked={data.is_correct} onChange={(e) => setData('is_correct', e.target.checked)} />
                        <label htmlFor="is_correct" className="text-sm font-medium">
                            Mark as correct
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
