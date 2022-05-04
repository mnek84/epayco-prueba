<?php

namespace App\Types;

/*
 * success:true o false (dice si el resultado de la operación tuvo éxito o no)
cod_error: (Código con el error si es éxito se sugiere enviar 00 sino el código de
error correspondiente)
message_error: (Mensaje explicativo del código de error)
data (Array u objetos con las respuestas).
 * */
class SoapResponse
{
    /**
     * @var int
     */
    public $success = false;

    /**
     * @var int
     */
    public $cod_error = 0;

    /**
     * @var string
     */
    public $message_error = "";

    /**
     * @var array
     */
    public $data = [];

    /**
     * Epayco Constructor
     *
     * @param bool $success
     * @param int $cod_error
     * @param string $message_error
     * @param array $data
     */
    public function __construct(bool $success, int $cod_error=0, string $message_error = "", array $data=[])
    {
        $this->success = $success;

        if ($this->success)
        {
            $this->cod_error = 00;
        }else{
            $this->cod_error = $cod_error;
        }

        $this->message_error = $message_error;
        $this->data = $data;
    }


}
