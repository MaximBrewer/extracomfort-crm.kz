<?php

namespace App\Http\Resources;

use App\Models\Book;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceCategoryCountBalanceReport extends JsonResource
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

        if ($filter['start'] && $filter['end']) {

            $books = Book::whereHas('service', function ($query) {
                $query->where('direction_id', $this->id);
            })->where('')->whereRaw('start=time')
                ->where('date', '>=', $filter['start'])->where('date', '<=', $filter['end'])
                ->where('status', 'completed')
                ->where('branch_id', $filter['branch']);
            if (!empty($filter['specialist']))
                $books = $books->whereIn('specialist_id', $filter['specialist']);
            if (!empty($filter['patient']))
                $books = $books->where('patient_id', $filter['patient']);
            if (!empty($filter['service']))
                $books = $books->whereIn('service_id', $filter['service']);
            if (!empty($filter['direction'])) {
                $direction = $filter['direction'];
                $books = $books->whereHas('service', function (Builder $query) use ($direction) {
                    $query->whereHas('category', function (Builder $query) use ($direction) {
                        $query->whereIn('direction_id', $direction);
                    });
                });
            }
        }


        return [
            'id' => $this->id,
            'sort' => $this->sort,
            'title' => $this->title,
            'books' => $books,
            'sum' => $this->sum,
        ];
    }
}
