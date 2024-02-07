<?php

namespace App\Repository;

use App\Models\School;

class SchoolRepo implements ISchoolRepo
{
    function all(): array
    {
        $schools = [
            new School([
                'name' => 'Techno School',
                'address' => '12345 Tech Street, City, Country',
                'country' => 'Sri Lanka',
                'currency' => 'LKR',
                'phone' => '0777046363',
                'email' => 'tech@school.com',
                'logo' => 'https://via.placeholder.com/150x150',
                'clr' => '{\"primary\":\"blue-800\", \"secondary\":\"blue-500\" }',
                'delivery' => true,
                'pickup' => true,
            ]),
        ];
        return $schools;
    }
}
