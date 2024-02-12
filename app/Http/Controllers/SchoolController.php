<?php

namespace App\Http\Controllers;

use App\Repository\ISchoolRepo;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\Sample;

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
            'schools' => $schools,
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
                'ui' => 'required|json',
                'subscription_expiry' => 'required|date',
                'delivery' => 'required|boolean',
                'pickup' => 'required|boolean',
                'admin' => 'required|json',
                'logo_id' => 'nullable|exists:logos,id'
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
            //'logo'  => $logoPath,
            'subscription_expiry' => $request->input('subscription_expiry'),
            'ui'  => $request->input('ui'),
            'is_active' => true,
            'delivery' => $request->input('delivery'),
            'pickup' => $request->input('pickup'),
            'admin'  => $request->input('admin'),
            'logo_id' => $request->input('logo_id')
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

    public function fetchSchool($id)
    {
        $school = $this->schoolRepo->fetchSchool($id);
        if ($school) {
            return response()->json([
                'school' => $school,
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "No School Found"], 404);
        }
    }

    public function updateLogo(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:schools,id',
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $id = $request->input('id');
        $logo = file_get_contents($request->file('logo')->path());

        $response = $this->schoolRepo->updateLogo($logo, $id);
        if ($response) {
            return response()->json([
                'message' => 'updated',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "couldn't update", 'response' => $response], 404);
        }
    }
    public function updateUI(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:schools,id',
                'ui' => 'required|json',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $id = $request->input('id');
        $ui = $request->input('ui');
        $response = $this->schoolRepo->updateUI($ui, $id);
        if ($response) {
            return response()->json([
                'message' => 'updated',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "couldn't update"], 404);
        }
    }

    public function updateStatus(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:schools,id',
                'is_active' => 'required|boolean',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $id = $request->input('id');
        $is_active = $request->input('is_active');
        $response = $this->schoolRepo->updateStatus($is_active, $id);
        if ($response) {
            return response()->json([
                'message' => 'updated',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "couldn't update"], 404);
        }
    }
    public function updateExpiry(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:schools,id',
                'subscription_expiry' => 'required|date',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $id = $request->input('id');
        $subscription_expiry = $request->input('subscription_expiry');
        $response = $this->schoolRepo->updateExpiry($subscription_expiry, $id);
        if ($response) {
            return response()->json([
                'message' => 'updated',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "couldn't update"], 404);
        }
    }

    public function updateInfo(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:schools,id',
                'name' => 'required|string',
                'address' => 'required|string',
                'email' => 'required|email',
                'phone' => 'required|string',
                'country' => 'required|string',
                'currency' => 'required|string',
                'delivery' => 'required|boolean',
                'pickup' => 'required|boolean',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $id = $request->input('id');
        $name = $request->input('name');
        $address = $request->input('address');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $country = $request->input('country');
        $currency = $request->input('currency');
        $delivery = $request->input('delivery');
        $pickup = $request->input('pickup');
        $response = $this->schoolRepo->updateInfo($id, $name, $address,  $email,  $phone, $country,  $currency, $delivery, $pickup);
        if ($response) {
            return response()->json([
                'message' => 'updated',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "couldn't update"], 404);
        }
    }

    public function updateAdmin(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:schools,id',
                'admin' => 'required|json',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $id = $request->input('id');
        $admin = $request->input('admin');
        $response = $this->schoolRepo->updateAdmin($admin, $id);
        if ($response) {
            return response()->json([
                'message' => 'updated',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "couldn't update"], 404);
        }
    }
    public function deleteSchool($id)
    {
        $school = $this->schoolRepo->deleteSchool($id);
        if ($school) {
            return response()->json([
                'message' => 'success',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "No School Found"], 404);
        }
    }

    public function addSample(Request $request)
    {
        // Validate the request data
        $request->validate([
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust validation rules as needed
        ]);

        // Process the image and convert it to binary data
        $imageBinary = file_get_contents($request->file('img')->path());

        // Create a new Sample model instance
        $sample = new Sample();
        $sample->img = $imageBinary;

        // Save the record to the database
        $sample->save();

        return "Sample record added successfully.";
    }

    public function getSampleImage($id)
    {
        $sample = Sample::find($id);

        if (!$sample) {
            return response()->json(['message' => 'Sample not found'], 404);
        }

        $image = $sample->img;


        return response($image)->header('Content-Type', 'image/jpeg');
    }
    public function updateSample(Request $request)
    {
        // Validate the request data
        $request->validate([
            'id' => 'required|exists:sample,id',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust validation rules as needed
        ]);

        // Process the image and convert it to binary data
        $imageBinary = file_get_contents($request->file('img')->path());
        $id = $request->file('id');
        // Create a new Sample model instance
        $sample = Sample::find($id);


        if ($sample) {
            $sample->img = $imageBinary;
            $sample->save();
            // School with the specified ID was found
            // You can now use the $school object for further operations
        } else {
            // School with the specified ID was not found
        }


        return "Sample record added successfully.";
    }
}
