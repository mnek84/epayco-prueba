<?php

namespace App\Service;

use App\Models\User;
use App\Types\SoapResponse;
use Illuminate\Support\Str;

use SoapFault;

class WalletService
{

    /**
     * Registrar una nueva cuenta de Usuario
     *
     * @param string $document
     * @param string $name
     * @param string $email
     * @param string $mobile
     *
     * @return 'App\Types\SoapResponse'
     */
    public function register(string $document="", string $name="", string $email="", string $mobile="")
    {

        $user = User::byDocument($document)->first();
        if ($user)
            return new SoapResponse(false,1,"El cliente ya existe");

        try {

            $user = User::create([
                'name'=>$name,
                'password'=>bcrypt(Str::random(8)),
                'document'=>$document,
                'email'=>$email,
                'mobile'=>$mobile
            ]);

            $user->wallet()->create([
                'balance'=>0
            ]);

            return new SoapResponse(true,0,"",$user->toArray());

        }catch (\Exception $e)
        {
            throw new SoapFault($e->getCode(),$e->getMessage());
        }

    }

    /**
     * Cargar Saldo a un usuario
     *
     * @param string $document
     * @param string $mobile
     * @param float $value
     *
     * @return 'App\Types\SoapResponse'
     */
    public function charge(string $document="",string $mobile="",float $value=0.00)
    {
        $user = User::byDocument($document)->byMobile($mobile)->first();
        if (!$user)
            return new SoapResponse(false,1,"No existe el usuario");

        try {

            $user->transactions()->create([
                'operation_type'=>1,
                'description'=>'Carga de Saldo',
                'value'=>$value
            ]);

            return new SoapResponse(true,0,"");


        }catch (\Exception $e)
        {
            throw new SoapFault($e->getCode(),$e->getMessage());
        }

    }

}
