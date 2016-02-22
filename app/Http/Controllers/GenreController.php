<?php

namespace App\Http\Controllers;

use App\Genre;
use Illuminate\Http\Request;

use App\Http\Requests;

class GenreController extends Controller
{
    /**
     * Afficher la liste des genres.
     *
     * @return \Illuminate\Http\Response
     */
    public function read()
    {
        return Genre::paginate(10)->toJson();
    }

    /**
     * Ajouter un genre.
     *
     * @param Request $request
     * @return Response
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'bail|required|unique:genres|max:255',
        ], $this->messages());

        return Genre::create(['name' => $request->name]);
    }

    /**
     * Modifier un genre.
     *
     * @param Request $request
     * @return Response
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'name' => 'bail|required|unique:genres|max:255',
        ], $this->messages());

        $genre = Genre::find($request->id);
        $genre->name = $request->name;
        $genre->save();

        return $genre;
    }

    /**
     * Supprimer un genre.
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ], $this->messages());
        $genre = Genre::find($request->id);

        $genre->delete();
    }

    /**
     * Retourne les messages d'erreurs personnalisés
     *
     * @return array
     */
    private function messages()
    {
        return [
            'id.required' => "L'ID est requis pour effectuer cette action.",
            'name.unique' => "Le libellé existe déjà."
        ];
    }
}
