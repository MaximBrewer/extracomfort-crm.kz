<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SupervisorStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'surname' => ['max:255'],
            'email' => ['required', 'email:rfc,dns', 'unique:users,email', 'max:255'],
            //'tin' => ['digits:12'],
            'birthdate' => ['date'],
            'phone' => ['string', 'max:255'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Имя обязательно',
            'name.string' => 'Имя должно быть строкой',
            'name.max' => 'Максимальное кол-во символов :max',
            'lastname.required' => 'Фамилия обязательно',
            'lastname.string' => 'Фамилия должно быть строкой',
            'lastname.max' => 'Максимальное кол-во символов :max',
            'surname.max' => 'Максимальное кол-во символов :max',
            'email.required' => 'E-mail обязательно',
            'email.email' => 'E-mail должен быть валидным адресом',
            'email.unique' => 'E-mail уже есть в системе',
            'email.max' => 'Максимальное кол-во символов :max',
            'tin.required' => 'ИИН обязательно',
            'tin.digits' => 'Кол-во символов должно быть 12',
            'birthdate.date' => 'День рождения должен быть датой',
        ];
    }
}
