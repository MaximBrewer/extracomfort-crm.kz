<?php

namespace App\Observers;

use App\Models\User as ModelsUser;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class User
{
    public function creating(ModelsUser $model)
    {
        return true;
    }

    public function updated(ModelsUser $model)
    {
        if ($model->role && $model->role->name === 'client') {
            if ($model->wasChanged(['name', 'tin', 'phone']) || $model->getOriginal('user_id') === null) {
                !App::isLocal() && $this->sendUserTo1c($model);
            }
        }
        return true;
    }

    private function sendUserTo1c(ModelsUser $model)
    {
        sleep(1);
        $url = 'http://79.140.228.7:80/IPBatmanovUT/hs/dataExchange/clients';

        $data = [[
            'name' => $model->fullName, // наименование клиента
            'BIN' => $model->tin, // индивидуальный идентификационный номер клиента
            'tel' => $model->phone, // телефон клиента
            'entity' => false, // »стина - юридическое лицо, Ћожь - физическое лицо
            'extId' => $model->id, // GUID в системе CRM
        ]];

        $response = Http::withBody(json_encode($data), 'application/json')->withBasicAuth('HTTPServiceUser', '7KwdgW')->post($url);

        // GUID - GUID созданного в 1— объекта, string
        // CRMGUID - GUID клиента в CRM, string
        // created - »стина - клиент создан, Ћожь - клиент не создан, boolean
        // message - описание ошибки, если есть, string

        $body = (string)$response->body();
        if ($response->getStatusCode() === 200) {
            if (substr($body, 0, 3) == pack("CCC", 0xEF, 0xBB, 0xBF)) {
                $body = substr($body, 3);
            }
            if ($json = json_decode($body)) {
                foreach ($json as $user1C) {
                    if ($user1C->CRMGUID == $model->id) {
                        $model->external_id = $user1C->GUID;
                        $model->saveQuietly();
                    }
                }
            }
        } else {
            Log::error($body);
        }
    }
}
