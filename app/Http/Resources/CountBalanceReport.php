<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Book;
use Illuminate\Contracts\Database\Eloquent\Builder;

class CountBalanceReport extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        global $filter;

        $books = null;
        $direction = $this;

        if ($filter['start'] && $filter['end']) {

            $books = Book::whereRaw('start=time')
                ->whereHas('payments', function ($query) {
                    $query->where('sum', '>', 0);
                })
                ->where('date', '>=', $filter['start'])->where('date', '<=', $filter['end'])
                ->where('status', 'completed')
                ->where('branch_id', $filter['branch']);
            if (!empty($filter['specialist']))
                $books = $books->whereIn('specialist_id', $filter['specialist']);
            if (!empty($filter['patient']))
                $books = $books->where('patient_id', $filter['patient']);
            if (!empty($filter['service']))
                $books = $books->whereIn('service_id', $filter['service']);
            $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                $query->whereHas('category', function (Builder $query) use ($direction) {
                    $query->where('direction_id', $direction->id);
                });
            });
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'books' => BookRecieption::collection($books->get()),
            'quantity' => $this->quantity,
            'sum' => $this->sum,
        ];
    }
}
