<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\UserCreatedNotification;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'surname',
        'lastname',
        'tin',
        'addon',
        'balance',
        'gender',
        'birthdate',
        'locality_id',
        'ais_id',
        'external_id',
        'hear_id',
        'consultant_id',
        'branch_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'birthdate' => 'date'
    ];


    public static $canBook = [
        'specialist',
        'recieption',
        'nurse'
    ];


    public static $canReminder = [
        'specialist',
        'recieption',
        'nurse'
    ];


    public static $canFisioBook = [
        // 'specialist',
        'recieption',
        'nurse'
    ];


    public static $canPay = [
        'recieption',
        'nurse'
    ];


    public static $canTask = [
        'admin' => [
            'recieption',
            'specialist',
            'manager',
            'sale',
            'nurse',
            'senior',
            'supervisor',
        ],
        'supervisor' => [
            'recieption',
            'nurse',
            'specialist',
        ],
        'accountant' => [
            'sale',
        ],
        'senior' => [
            'sale',
            'specialist',
        ],
        'sale' => [
            'specialist',
        ],
        'specialist' => [],
        'recieption' => [
            'nurse',
            'specialist',
        ],
        'nurse' => [
            'specialist',
        ],
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('withDirections', function (Builder $builder) {
            $builder->with('directions')->with('locality');
        });
    }
    /**
     * Interact with the user's balance.
     */
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d.m.Y')
        );
    }

    /**
     * Interact with the user's balance.
     */
    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn($value) => (int) $value / 100,
            set: fn($value) => (float) $value * 100,
        );
    }

    /**
     * Interact with the user's balance.
     */
    public function booksSpecialist(): HasMany
    {
        return $this->hasMany(Book::class, 'specialist_id')->with('patient');
    }

    /**
     * Interact with the user's balance.
     */
    public function booksRecieption(): HasMany
    {
        return $this->hasMany(Book::class, 'recieption_id');
    }

    /**
     * Interact with the user's balance.
     */
    public function booksPatient(): HasMany
    {
        return $this->hasMany(Book::class, 'patient_id');
    }

    /**
     * Interact with the user's balance.
     */
    protected function birthdate(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                if (!$value)
                    return $value;
                $date = Carbon::parse($value)->subCenturies(10);
                return $date;
            },
            set: function ($value) {
                $date = Carbon::parse($value)->addCenturies(10);
                return $date->format('Y-m-d');
            }
        );
    }

    /**
     * Interact with the user's balance.
     */
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: function () {
                return trim($this->lastname . ' ' . $this->name . ' ' . $this->surname);
            }
        );
    }

    /**
     * Interact with the user's balance.
     */
    protected function fio(): Attribute
    {
        return Attribute::make(
            get: function () {
                $return = '';
                if ($this->lastname) {
                    $return .= $this->lastname;
                }
                if ($this->name) {
                    $return .= ' ' . mb_substr($this->name, 0, 1) . '.';
                }
                if ($this->surname) {
                    $return .= ' ' . mb_substr($this->surname, 0, 1) . '.';
                }
                return $return;
            }
        );
    }

    /**
     * The users that belong to the role.
     */
    public function locality(): BelongsTo
    {
        return $this->belongsTo(Locality::class);
    }

    /**
     * The users that belong to the role.
     */
    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    /**
     * The users that belong to the role.
     */
    public function directions(): BelongsToMany
    {
        return $this->belongsToMany(Direction::class, 'user_direction')->withPivot(['base']);
    }

    /**
     * Send the email created notification.
     *
     * @return void
     */
    public function sendCreatedNotification()
    {
        $this->notify(new UserCreatedNotification);
    }

    /**
     * The users that belong to the role.
     */
    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'specialist_id');
    }

    /**
     * Return default User Role.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Return default User Role.
     */
    public function hear(): BelongsTo
    {
        return $this->belongsTo(Hear::class);
    }

    /**
     * The users that belong to the role.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'user_id');
    }

    /**
     * The users that belong to the role.
     */
    public function topUps(): HasMany
    {
        return $this->hasMany(TopUp::class, 'user_id');
    }

    /**
     * The users that belong to the role.
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'user_id');
    }

    /**
     * The users that belong to the role.
     */
    public function getSchedule(Branch $branch)
    {
        $schedule = $this->schedules()->firstOrCreate([
            'branch_id' => $branch->id,
        ]);

        $lastDay = $schedule->datetimes()->where([
            'datetime' => now()->startOfWeek()->addDays(27)->addHours(9),
        ])->first();

        if (!$lastDay) {
            $end = now()->startOfWeek()->addDays(28);
            $date = now()->startOfWeek();
            $date->addHours(9);
            do {
                $schedule->datetimes()->firstOrCreate([
                    'datetime' => $date,
                ], [
                    'status' => 'free'
                ]);
                $date->addMinutes(5);
                if ($date->format('H:i') === "19:35") {
                    $date->addDay()->startOfDay()->addHours(9);
                }
            } while ($date < $end);
        }

        $times = [];
        foreach ($schedule->datetimes as $time) {
            if (!isset($times[$time->datetime->format('H:i')]))
                $times[$time->datetime->format('H:i')] = [
                    'time' => $time->datetime->format('H:i'),
                    'days' => []
                ];
            $times[$time->datetime->format('H:i')]['days'][$time->datetime->format('d.m.Y')] = [
                'id' => $time->id,
                'date' => $time->datetime->format('d.m.Y'),
                'status' => $time->status
            ];
        }
        foreach ($times as &$time) {
            $time['days'] = array_values($time['days']);
        }
        $times = array_values($times);

        return $times;
    }

    /**
     * The users that belong to the role.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    public function calcBalance()
    {
        $this->balance = $this->topUps()->sum('sum') / 100;
        $this->save();
    }
}
