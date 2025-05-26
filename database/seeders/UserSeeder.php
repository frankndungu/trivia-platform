<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Francis Ndungu',
            'email' => 'ndungufrank01@gmail.com',
        ]);

        User::factory()->create([
            'name' => 'Jeff Ireri',
            'email' => 'jeffireri418@gmail.com',
        ]);

        User::factory(5)->create();
    }
}
