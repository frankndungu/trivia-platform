import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Create', href: '/games/create' },
];

export default function CreateGame() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/games');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Game" />

            <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold">Create a New Trivia Game</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="mb-1 block text-sm font-medium">
                            Game Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="mb-1 block text-sm font-medium">
                            Description (optional)
                        </label>
                        <textarea
                            id="description"
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Create Game
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
