<?php

namespace App\Http\Resources;

use App\Models\Book;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DirectionCanceledResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        global $filter;

        $specialists = [];
        $firstd = 0;
        $repeatd = 0;
        $totald = 0;

        foreach ($this->specialists as $specialist) {


            if (!empty($filter['specialist']) && !in_array($specialist->id, $filter['specialist'])) continue;

            $books = null;

            if ($filter['start'] && $filter['end']) {
                $books = Book::whereRaw('start=time')
                    ->where('date', '>=', $filter['start'])->where('date', '<=', $filter['end'])
                    ->where('status', 'completed')
                    ->where('branch_id', $filter['branch'])
                    ->where('specialist_id', $specialist->id);
                if (!empty($filter['patient'])) $books = $books->where('patient_id', $filter['patient']);
                if (!empty($filter['service'])) $books = $books->whereIn('service_id', $filter['service']);
                if (!empty($filter['direction'])) {
                    $direction = $filter['direction'];
                    $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                        $query->whereHas('category', function (Builder $query) use ($direction) {
                            $query->whereIn('direction_id', $direction);
                        });
                    });
                }
            }
            $booksf = $books->clone();
            $booksr = $books->clone();

            $specialists[] = [
                'id' => $specialist->id,
                'fullname' => $specialist->fullname,
                'first' => $booksf->where('repeated', false)->count(),
                'repeat' => $booksr->where('repeated', true)->count(),
                'total' => $books->count(),
            ];
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'specialists' => $specialists,
            'first' => $firstd,
            'repeat' => $repeatd,
            'total' => $totald,
        ];
    }
}
