<?php

namespace App\Http\Controllers;

use App\Repository\ISchoolRepo;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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

    public function store(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|unique:schools',
                'name' => 'required|string',
                'address' => 'required|string',
                'country' => 'required|string',
                'currency' => 'required|string',
                'phone' => 'required|string',
                'email' => 'required|email',
                'logo' => 'required|string',
                'ui' => 'required|json',
                'subscription_expiry' => 'required|date',
                'delivery' => 'required|boolean',
                'pickup' => 'required|boolean',
                'admin' => 'required|json',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $schoolData = [
            'id' => $request->input('id'),
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'country'  => $request->input('country'),
            'currency' => $request->input('currency'),
            'phone'  => $request->input('phone'),
            'email' => $request->input('email'),
            'logo'  => $request->input('logo'),
            'subscription_expiry' => $request->input('subscription_expiry'),
            'ui'  => $request->input('ui'),
            'delivery' => $request->input('delivery'),
            'pickup' => $request->input('pickup'),
            'admin'  => $request->input('admin'),
        ];

        $createdSchool = $this->schoolRepo->store($schoolData);
        if (!$createdSchool) {
            return response()->json(['errors' => "An error occurred while creating the school."], 403);
        } else {
            return response()->json([
                'data' => $createdSchool,
                'status' => 201
            ], 201);
        }
    }
}
