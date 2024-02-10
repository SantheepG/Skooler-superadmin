<?php

namespace App\Repository;

use App\Models\School;

class SchoolRepo implements ISchoolRepo
{
    public function all()
    {
        return School::all();
    }

    // Store a new school
    public function store($schoolData)
    {
        return School::create($schoolData);
    }
}
