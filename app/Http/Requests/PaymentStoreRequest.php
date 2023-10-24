<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PaymentStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && in_array(Auth::user()->role->name, User::$canPay);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'sum' => ['required', 'numeric', 'max:' . ($this->post('method') === 'balance' ? $this->book->patient->balance : '10000000')],
            'method' => 'required'
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
            'sum.max' => $this->post('method') === 'balance' ? 'Сумма превышает баланс пациента' : 'Сумма не более 10000000₸',
            'sum.required' => 'Введите сумму',
            'method.required' => 'Выберите значение'
        ];
    }
}
