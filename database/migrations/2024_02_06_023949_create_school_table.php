<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('school', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('country');
            $table->string('currency');
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('logo');
            $table->json('clr');
            $table->boolean('delivery');
            $table->boolean('pickup');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school');
    }
};
