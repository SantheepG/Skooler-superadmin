<?php

namespace App\Repository;

interface ISchoolRepo
{
    public function all();
    public function store($schoolData);
}
