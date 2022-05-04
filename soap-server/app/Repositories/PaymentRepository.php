<?php

namespace App\Repositories;

use App\Models\OperationToken;
use App\Models\User;
use Illuminate\Support\Str;

class PaymentRepository
{

    /**
     * @return string
     */
    private function createToken(): string
    {
        return Str::random(16);
    }

    /**
     * @return string
     */
    private function createSessionId(): string
    {
        return Str::random(8);
    }


    /**
     * @param User $user
     * @param $description
     * @param $price
     * @return OperationToken
     */
    public function createPaymentIntent(User $user, $description, $price):OperationToken
    {
        $intent = new OperationToken();
        $intent->user()->associate($user);
        $intent->token  = $this->createToken();
        $intent->session = $this->createSessionId();
        $intent->description = $description;
        $intent->price = $price;

        $intent->save();
        return $intent;
    }



}
