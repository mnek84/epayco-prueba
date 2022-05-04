<?php

namespace App\Http\Controllers;

use App\Service\WalletService;
use Illuminate\Http\Request;


class UserSoapController extends Controller
{

    protected function getService(): string
    {
        return WalletService::class;
    }

    protected function getEndpoint(): string
    {
        return route('soap.server');
    }

    protected function getWsdlUri(): string
    {
        return route('soap.provider');
    }
}
