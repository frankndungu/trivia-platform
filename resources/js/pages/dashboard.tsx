import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Attempt {
    id: number;
    score: number;
    total: number;
    created_at: string;
    game: {
        title: string;
    };
}

interface Props {
    attempts: Attempt[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ attempts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Leaderboard section */}
                <div className="space-y-4 rounded-xl border bg-white p-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Quiz Attempts</h2>

                    {attempts.length === 0 ? (
                        <p className="text-sm text-gray-500">You haven't taken any quizzes yet.</p>
                    ) : (
                        <ul className="divide-y rounded-md border">
                            {attempts.map((a) => (
                                <li key={a.id} className="flex items-center justify-between px-4 py-3">
                                    <div>
                                        <p className="font-medium text-gray-900">{a.game.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {a.score}/{a.total} correct on {new Date(a.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-lg font-semibold text-indigo-600">{Math.round((a.score / a.total) * 100)}%</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
