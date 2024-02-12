<?php

namespace App\Repository;

use App\Models\School;
use App\Models\Sample;

class SchoolRepo implements ISchoolRepo
{
    //Fetching all schools
    public function all()
    {
        return School::all();
    }

    // Storing a new school
    public function store($schoolData)
    {
        return School::create($schoolData);
    }

    //Fetching a particular school
    public function fetchSchool($id)
    {
        return School::findOrFail($id);
    }

    public function addLogo($img)
    {
        return Sample::create($img);
    }

    public function updateUI($ui, $id)
    {
        try {
            $school = School::findOrFail($id);
            $school->ui = $ui;
            $school->save();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateStatus($is_active, $id)
    {
        try {
            $school = School::findOrFail($id);
            $school->is_active = $is_active;
            $school->save();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateExpiry($subscription_expiry, $id)
    {
        try {
            $school = School::findOrFail($id);
            $school->subscription_expiry = $subscription_expiry;
            $school->save();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateInfo($id, $name, $address,  $email,  $phone, $country,  $currency, $delivery, $pickup)
    {
        try {
            $school = School::findOrFail($id);
            $school->name = $name;
            $school->address = $address;
            $school->email = $email;
            $school->phone = $phone;
            $school->country = $country;
            $school->currency = $currency;
            $school->delivery = $delivery;
            $school->pickup = $pickup;
            $school->save();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function updateAdmin($admin, $id)
    {
        try {
            $school = School::findOrFail($id);
            $school->admin = $admin;
            $school->save();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    public function deleteSchool($id)
    {
        try {
            // Find the school by ID
            $school = School::find($id);

            if (!$school) {
                return "School with ID $id not found.";
            }
            // Delete the school
            $school->delete();

            return "School with ID $id deleted successfully.";
        } catch (\Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }
    public function updateLogo($logo, $id)
    {
        try {
            $school = School::findOrFail($id);
            $school->logo = $logo;
            $school->save();
            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }
}
