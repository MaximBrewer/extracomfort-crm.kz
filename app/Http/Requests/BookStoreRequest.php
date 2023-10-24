<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class BookStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && in_array(Auth::user()->role->name, User::$canBook);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'day' => 'required_without:date',
            'week' => 'required_without:date',
            'year' => 'required_without:date',
            'time' => 'required',
            'duration' => 'required',
            'service' => 'required',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function messages(): array
    {
        return [
            'day.required' => 'Выберите значение',
            'week.required' => 'Выберите значение',
            'year.required' => 'Выберите значение',
            'time.required' => 'Выберите значение',
            'duration.required' => 'Выберите значение',
            'service.required' => 'Выберите значение',
        ];
    }
}
