<?php

use App\Http\Controllers\SchoolController;
use App\Http\Controllers\LogoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('super/fetch', [SchoolController::class, 'index']);
Route::post('super/store', [SchoolController::class, 'addSchool']);
Route::post('super/checkid/{id}', [SchoolController::class, 'checkSchoolId']);

Route::get('super/getschool/{id}', [SchoolController::class, 'fetchSchool']);
Route::get('super/checkid/{id}', [SchoolController::class, 'checkID']);
Route::put('super/school/updateui', [SchoolController::class, 'updateUI']);
Route::put('super/school/updatestatus', [SchoolController::class, 'updateStatus']);
Route::put('super/school/updateexpiry', [SchoolController::class, 'updateExpiry']);
Route::put('super/school/updateinfo', [SchoolController::class, 'updateInfo']);
Route::put('super/school/updateadmin', [SchoolController::class, 'updateAdmin']);

Route::delete('super/school/delete/{id}', [SchoolController::class, 'deleteSchool']);



//Logo
Route::post('super/addlogo', [SchoolController::class, 'addSchoolLogo']);
Route::post('super/updatelogo', [SchoolController::class, 'updateSchoolLogo']);
Route::get('super/getlogo/{id}', [LogoController::class, 'getLogo']);
