<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;

use App\Models\Logo;
use Illuminate\Http\Request;

class LogoController extends Controller
{
    public function addLogo(Request $request)
    {
        try {
            $request->validate([
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }
        // Validate the request data


        // Process the image and convert it to binary data
        $imageBinary = file_get_contents($request->file('logo')->path());

        // Create a new Sample model instance
        $logo = new Logo();
        $logo->logo = $imageBinary;

        // Save the record to the database
        $logo->save();
        return response()->json([
            'message' => 'updated',
            'logo_id' =>  $logo->id,
            'status' => 201
        ], 201);
    }
    public function getLogo($id)
    {
        $sample = Logo::find($id);

        if (!$sample) {
            return response()->json(['message' => 'Sample not found'], 404);
        }

        $image = $sample->logo;


        return response($image)->header('Content-Type', 'image/jpeg');
    }
    public function updateLogo(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:logos,id',
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',

            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        }

        $imageBinary = file_get_contents($request->file('logo')->path());
        $id = $request->input('id');
        $logo = Logo::find($id);


        if ($logo) {
            $logo->logo = $imageBinary;
            $logo->save();
            return response()->json([
                'message' => 'updated',
                'status' => 200
            ], 200);
        } else {
            return response()->json(["error" => "couldn't update", 'logo' => $logo], 404);
        }
    }
}
