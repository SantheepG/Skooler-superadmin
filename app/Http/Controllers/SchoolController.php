<?php

namespace App\Http\Controllers;

use App\Repository\ISchoolRepo;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    private ISchoolRepo $schoolRepo;

    public function __construct(ISchoolRepo $schoolRepo)
    {
        $this->schoolRepo = $schoolRepo;
    }

    public function index()
    {
        $schools = $this->schoolRepo->all();
        return response()->json([
            'data' => $schools,
            'status' => 200
        ], 200);
    }
}
