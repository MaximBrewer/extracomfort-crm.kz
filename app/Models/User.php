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

    public static $dayShedule = [
        '09:00' => 'free',
        '09:05' => 'free',
        '09:10' => 'free',
        '09:15' => 'free',
        '09:20' => 'free',
        '09:25' => 'free',
        '09:30' => 'free',
        '09:35' => 'free',
        '09:40' => 'free',
        '09:45' => 'free',
        '09:50' => 'free',
        '09:55' => 'free',
        '10:00' => 'free',
        '10:05' => 'free',
        '10:10' => 'free',
        '10:15' => 'free',
        '10:20' => 'free',
        '10:25' => 'free',
        '10:30' => 'free',
        '10:35' => 'free',
        '10:40' => 'free',
        '10:45' => 'free',
        '10:50' => 'free',
        '10:55' => 'free',
        '11:00' => 'free',
        '11:05' => 'free',
        '11:10' => 'free',
        '11:15' => 'free',
        '11:20' => 'free',
        '11:25' => 'free',
        '11:30' => 'free',
        '11:35' => 'free',
        '11:40' => 'free',
        '11:45' => 'free',
        '11:50' => 'free',
        '11:55' => 'free',
        '12:00' => 'free',
        '12:05' => 'free',
        '12:10' => 'free',
        '12:15' => 'free',
        '12:20' => 'free',
        '12:25' => 'free',
        '12:30' => 'free',
        '12:35' => 'free',
        '12:40' => 'free',
        '12:45' => 'free',
        '12:50' => 'free',
        '12:55' => 'free',
        '13:00' => 'free',
        '13:05' => 'free',
        '13:10' => 'free',
        '13:15' => 'free',
        '13:20' => 'free',
        '13:25' => 'free',
        '13:30' => 'free',
        '13:35' => 'free',
        '13:40' => 'free',
        '13:45' => 'free',
        '13:50' => 'free',
        '13:55' => 'free',
        '14:00' => 'free',
        '14:05' => 'free',
        '14:10' => 'free',
        '14:15' => 'free',
        '14:20' => 'free',
        '14:25' => 'free',
        '14:30' => 'free',
        '14:35' => 'free',
        '14:40' => 'free',
        '14:45' => 'free',
        '14:50' => 'free',
        '14:55' => 'free',
        '15:00' => 'free',
        '15:05' => 'free',
        '15:10' => 'free',
        '15:15' => 'free',
        '15:20' => 'free',
        '15:25' => 'free',
        '15:30' => 'free',
        '15:35' => 'free',
        '15:40' => 'free',
        '15:45' => 'free',
        '15:50' => 'free',
        '15:55' => 'free',
        '16:00' => 'free',
        '16:05' => 'free',
        '16:10' => 'free',
        '16:15' => 'free',
        '16:20' => 'free',
        '16:25' => 'free',
        '16:30' => 'free',
        '16:35' => 'free',
        '16:40' => 'free',
        '16:45' => 'free',
        '16:50' => 'free',
        '16:55' => 'free',
        '17:00' => 'free',
        '17:05' => 'free',
        '17:10' => 'free',
        '17:15' => 'free',
        '17:20' => 'free',
        '17:25' => 'free',
        '17:30' => 'free',
        '17:35' => 'free',
        '17:40' => 'free',
        '17:45' => 'free',
        '17:50' => 'free',
        '17:55' => 'free',
        '18:00' => 'free',
        '18:05' => 'free',
        '18:10' => 'free',
        '18:15' => 'free',
        '18:20' => 'free',
        '18:25' => 'free',
        '18:30' => 'free',
        '18:35' => 'free',
        '18:40' => 'free',
        '18:45' => 'free',
        '18:50' => 'free',
        '18:55' => 'free',
        '19:00' => 'free',
        '19:05' => 'free',
        '19:10' => 'free',
        '19:15' => 'free',
        '19:20' => 'free',
        '19:25' => 'free'
    ];
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
        'schedule',
        'locality_id',
        'ais_id',
        'external_id',
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
        'birthdate' => 'date',
        'schedule' => 'array'
    ];


    public static $canBook = [
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
     * The "booted" method of the model.
     */
    public static function getDayArray($rest = false): array
    {
        $times = [];
        foreach (self::$dayShedule as $time => $status) {
            $times[] = [
                'time' => $time,
                'days' => [
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    'rest',
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    'rest',
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    'rest',
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    $status,
                    'rest',
                ]
            ];
        }
        return $times;
    }

    /**
     * Interact with the user's balance.
     */
    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (int)$value / 100,
            set: fn ($value) => (float)$value * 100,
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
                if (!$value) return $value;
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
     * The users that belong to the role.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'user_id');
    }

    /**
     * The users that belong to the role.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'user_id');
    }
}
