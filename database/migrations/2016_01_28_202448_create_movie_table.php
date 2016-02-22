<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovieTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movie', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('original_title')->nullable();
            $table->text('synopsis')->nullable();
            $table->smallInteger('duration')->nullable();
            $table->smallInteger('pegi')->nullable();
            $table->string('cover')->nullable();
            $table->timestamps();
            $table->timestamp('released_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('movie');
    }
}
