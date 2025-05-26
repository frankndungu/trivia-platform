import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Game {
    id: number;
    title: string;
}

interface Score {
    correct: number;
    total: number;
    percentage: number;
}

interface Props {
    game: Game;
    score: Score;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Play Games', href: '/play' },
];

export default function QuizResult({ game, score }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz Result" />

            <div className="mx-auto mt-10 max-w-lg space-y-6 rounded-xl bg-white p-6 text-center shadow">
                <h1 className="text-2xl font-bold">Quiz Results for "{game.title}"</h1>

                <div className="text-xl font-semibold text-green-700">
                    You scored {score.correct} / {score.total}
                </div>

                <div className="text-lg text-gray-600">
                    That’s <span className="font-semibold">{score.percentage}%</span> correct.
                </div>

                <div className="flex justify-center gap-4 pt-4">
                    <Link href={`/play/${game.id}`} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Retry Quiz
                    </Link>

                    <Link href="/play" className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Back to Games
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
