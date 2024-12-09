import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { IMaskInput, useIMask } from 'react-imask';




export default function Login({ status, canResetPassword, pagetitle = `` }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        phone: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    return (

        <div className="min-h-screen flex flex-col items-center justify-center">
            <Head title={pagetitle} />
            <div className={`mb-4`}>
                <Link href="/">
                    <ApplicationLogo className="w-32 h-auto" />
                </Link>
            </div>
            <h1 className={`text-2xl font-bold text-center`}>Добро пожаловать!</h1>
            <p className={`mb-4`}>Для продолжения введите номер E-mail и пароль!</p>
            <div className="w-full max-w-md px-6 pb-6 pt-12 bg-white overflow-hidden shadow-[0px_1px_8px_rgba(0,0,0,.1)] rounded-xl">

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <div className={` px-6`}>
                        {/* <InputLabel htmlFor="phone" value="Phone" /> */}
                        {/* <IMaskInput
                            mask={`+7 000 000 0000`}
                            value={data.phone}
                            unmask={false} // true|false|'typed'
                            // ref={ref}
                            // inputRef={inputRef}  // access to nested input
                            // // DO NOT USE onChange TO HANDLE CHANGES!
                            // // USE onAccept INSTEAD
                            onAccept={
                                // depending on prop above first argument is
                                // `value` if `unmask=false`,
                                // `unmaskedValue` if `unmask=true`,
                                // `typedValue` if `unmask='typed'`
                                (value, mask) => {
                                    handleOnChange({
                                        target: {
                                            value: value,
                                            name: `phone`
                                        }
                                    })
                                }
                            }
                            className={`rounded-xl bg-blue-400 bg-opacity-20 border-0 ring-0 mt-1 block w-full text-xl`}
                            // ...and more mask props in a guide
                            type={`text`}
                            // input props also available
                            placeholder='+7 777 777 7777'
                        /> */}


                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder={`E-mail`}
                            className="mt-1 block w-full text-xl"
                            autoComplete="email"
                            onChange={handleOnChange}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-6 px-6">
                        {/* <InputLabel htmlFor="password" value="Password" /> */}

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder={`Пароль`}
                            className="mt-1 block w-full text-xl"
                            autoComplete="current-password"
                            onChange={handleOnChange}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="hidden mt-6">
                        <label className="flex items-center">
                            <Checkbox name="remember" value={data.remember} onChange={handleOnChange} defaultChecked={!0} />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    {/* <div className="mt-6 text-center text-xl">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-blue-500"
                            >
                                Не помню пароль!
                            </Link>
                        )}
                    </div> */}

                    <div className="mt-6">
                        <PrimaryButton className="w-full justify-center" disabled={processing}>Войти</PrimaryButton>
                    </div>

                    {/* <div className="mt-4 text-center text-xl">
                        <Link
                            href={route('register')}
                            className="underline text-blue-500"
                        >
                            Нет аккаунта
                        </Link>
                    </div> */}
                </form>
            </div>
        </div>
    );
}
