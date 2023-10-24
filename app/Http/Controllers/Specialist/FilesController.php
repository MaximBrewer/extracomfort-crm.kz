<?php

namespace App\Http\Controllers\Specialist;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileDeleteRequest;
use App\Models\File;

class FilesController extends Controller
{
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FileDeleteRequest $request, File $file)
    {
        $file->delete();
        return redirect($request->redirect);
    }
}
