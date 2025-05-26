import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Leader {
    user: string;
    games_played: number;
    percentage: number;
}

interface Props {
    leaders: Leader[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Leaderboard', href: '/leaderboard' },
];

export default function Leaderboard({ leaders }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leaderboard" />

            <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-center text-2xl font-bold">Global Leaderboard</h1>

                {leaders.length === 0 ? (
                    <p className="text-center text-gray-500">No quiz attempts have been recorded yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b font-semibold text-gray-700">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">User</th>
                                    <th className="px-4 py-2">Games Played</th>
                                    <th className="px-4 py-2">Avg. Score (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaders.map((leader, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{leader.user}</td>
                                        <td className="px-4 py-2">{leader.games_played}</td>
                                        <td className="px-4 py-2 font-medium text-indigo-600">{leader.percentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
