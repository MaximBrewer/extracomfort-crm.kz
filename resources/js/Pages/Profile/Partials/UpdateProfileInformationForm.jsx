import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {

    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        lastname: user.lastname ?? ``,
        surname: user.surname ?? ``,
        name: user.name ?? ``,
        email: user.email ?? ``,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Профиль</h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="email" value="E-mail" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="lastname" value="Фамилия" />

                    <TextInput
                        id="lastname"
                        className="mt-1 block w-full"
                        value={data.lastname}
                        required
                        onChange={(e) => setData('lastname', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.lastname} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Имя" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        required
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="surname" value="Отчество" />

                    <TextInput
                        id="surname"
                        className="mt-1 block w-full"
                        value={data.surname}
                        onChange={(e) => setData('surname', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.surname} />
                </div>

                {/* {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )} */}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} size="sm">Сохранить</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Сохранено.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
