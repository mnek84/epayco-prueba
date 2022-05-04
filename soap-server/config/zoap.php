<?php

return [

    // Service configurations.

    'services'          => [

        'walletservice'              => [
            'name'              => 'wallet',
            'class'             => \App\Service\WalletService::class,
            'exceptions'        => [
                'Exception'
            ],
            'types'             => [
                'keyValue'          => 'Viewflex\Zoap\Demo\Types\KeyValue',
                'soapResponse'      => \App\Types\SoapResponse::class,
            ],
            'strategy'          => 'ArrayOfTypeComplex',
            //'strategy'          => 'DefaultComplexType',
            'headers'           => [
                'Cache-Control'     => 'no-cache, no-store'
            ],
            'options'           => []
        ]

    ],


    // Log exception trace stack?

    'logging'       => true,


    // Mock credentials for demo.

    'mock'          => [
        'user'              => 'test@test.com',
        'password'          => 'tester',
        'token'             => 'tGSGYv8al1Ce6Rui8oa4Kjo8ADhYvR9x8KFZOeEGWgU1iscF7N2tUnI3t9bX'
    ],


];
