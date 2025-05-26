import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Game {
    id: number;
    title: string;
}

interface Props {
    game: Game;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Invite', href: '#' },
];

export default function InviteUser({ game }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/games/${game.id}/invite`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Invite to ${game.title}`} />

            <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold">Invite to: {game.title}</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium">
                            Recipient Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Send Invitation
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
