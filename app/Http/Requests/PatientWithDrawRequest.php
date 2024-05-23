<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PatientWithDrawRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && in_array(Auth::user()->role->name, ['nurse', 'recieption', 'senior']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            // 'paymethod' => ['required'],
            'sum' => ['required', 'numeric', 'min:1', 'max:100000000'],
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
            // 'paymethod.required' => "Выберите метод пополнения",
            'sum.required' => "Введите сумму",
            'sum.between' => "Сумма не корректна",
            'sum.numeric' => "Сумма не корректна",
            'sum.min' => "Сумма не корректна",
            'sum.max' => "Сумма не корректна"
        ];
    }
}
