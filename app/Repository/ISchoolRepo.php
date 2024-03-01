<?php

namespace App\Repository;

use Illuminate\Http\Request;

interface ISchoolRepo
{
    public function all();
    public function store($schoolData);
    public function fetchSchool($id);
    public function addLogo($img);
    public function updateUI($ui, $id);
    public function updateStatus($is_active, $id);
    public function updateExpiry($subscription_expiry, $id);
    public function updateInfo($id, $name, $address,  $email,  $phone, $country,  $currency, $delivery, $pickup);
    public function updateAdmin($admin, $id);
    public function updateLogo($logo, $id);
    public function deleteSchool($id);
    public function AddSchoolLogo(Request $request);
    public function UpdateSchoolLogo(Request $request);
    public function CheckSchoolID($id);
}
