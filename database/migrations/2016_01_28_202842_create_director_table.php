<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDirectorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('director', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->timestamps();
            $table->timestamp('birthday')->nullable();
        });

        Schema::create('director_movie', function(Blueprint $table) {
            $table->integer('director_id')->unsigned()->index();
            $table->foreign('director_id')->references('id')->on('director')->onDelete('cascade');

            $table->integer('movie_id')->unsigned()->index();
            $table->foreign('movie_id')->references('id')->on('movie')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('director_movie');
        Schema::drop('director');
    }
}
