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
        //
        User::factory()->create([
            'name' => 'Cristian Marcelo',
            'email' => 'cristian@popmix.com',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Cinthia',
            'email' => 'cinthia@popmix.com',
            'role' => 'entrega',
        ]);

        User::factory()->create([
            'name' => 'Geraldine',
            'email' => 'geraldine@popmix.com',
            'role' => 'produccion',
        ]);

        User::factory()->create([
            'name' => 'Gabriela',
            'email' => 'gabriela@popmix.com',
            'role' => 'promotor',
        ]);

        User::factory(9)->create();
    }
}
