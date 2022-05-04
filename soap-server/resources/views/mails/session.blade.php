<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <p>Hola {!! $userName !!},</p>
    <p>Has creado satisfactoriamente una operación para hacer un pago. Para poder Confirmar la operación tiene que utilizar en la confirmación el siguiente código</p>

    <table>
        <thead>
            <th>{!! $description !!}</th>
            <th>$ {!! $price !!}</th>
        </thead>
    </table>

    <p>Código de confirmacion: <strong>{!! $session !!}</strong></p>
</body>
</html>
