<?php

namespace App\Service;

use App\Jobs\SendSessionIntentToUserMail;
use App\Models\OperationToken;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\PaymentRepository;
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


    /**
     * Consulta de Saldo a un usuario
     *
     * @param string $document
     * @param string $mobile
     *
     * @return 'App\Types\SoapResponse'
     */
    public function checkBalance(string $document="",string $mobile="")
    {
        $user = User::byDocument($document)->byMobile($mobile)->first();

        if (!$user)
            return new SoapResponse(false,1,"No existe el usuario");

        try {

            $balance = $user->wallet->balance;

            return new SoapResponse(true,0,"",['current_balance'=>$balance]);


        }catch (\Exception $e)
        {
            throw new SoapFault($e->getCode(),$e->getMessage());
        }

    }


    /**
     * Crea una intención de Pago
     *
     * @param string $document
     * @param string $mobile
     * @param string $description
     * @param float $price
     *
     * @return 'App\Types\SoapResponse'
     */
    public function createPaymentIntent(string $document="", string $mobile="", string $description="", float $price=0.00): SoapResponse
    {
        $user = User::byDocument($document)->byMobile($mobile)->first();

        if (!$user)
            return new SoapResponse(false,1,"No existe el usuario");

        try {

            $balance = $user->wallet->balance;

            if ($price>$balance)
                return new SoapResponse(false,2,"Fondos Insuficientes para la operación");


            /* Create Payment Intent */
            $paymentRepository = new PaymentRepository();

            $intent = $paymentRepository->createPaymentIntent($user,$description,$price);

            /* Disaptch Job */
            dispatch(new SendSessionIntentToUserMail($intent));

            $message = "Se ha generado un código que fue enviado a su correo. Al utilizar el token recibido más el Id que esta en su correo se confirma la operación";
            return new SoapResponse(true,0,"",['token'=>$intent->token]);

        }catch (\Exception $e)
        {
            throw new SoapFault($e->getCode(),$e->getMessage());
        }

    }


    /**
     * Confirmar un Pago
     *
     * @param string $document
     * @param string $session
     * @param string $token
     *
     * @return 'App\Types\SoapResponse'
     */
    public function confirmatePayment(string $document,string $session,string $token): SoapResponse
    {
        $operationToken = OperationToken::bySession($session)->byToken($token)->first();

        if (!$operationToken)
            return new SoapResponse(false,1,"No existe la operación");

        try {
            $balance = $operationToken->user->wallet->balance;

            if ($operationToken->price > $balance)
                return new SoapResponse(false,1,"Fondos insuficientes para realizar la operación");


            $operationToken->user->transactions()->create([
                'operation_type'=>Transaction::OPERATION_TYPE_REMOVE,
                'description'=>'[PAGO] '.$operationToken->description,
                'value'=>$operationToken->price
            ]);


            return new SoapResponse(true,0,"Operación exitosa",[]);


        }catch (\Exception $e)
        {
            throw new SoapFault($e->getCode(),$e->getMessage());
        }

    }

}
