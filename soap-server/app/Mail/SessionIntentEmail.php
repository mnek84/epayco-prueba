<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SessionIntentEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $userName;
    private $description;
    private $price;
    private $session;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($userName,$description,$price,$session)
    {
        $this->userName = $userName;
        $this->description = $description;
        $this->price = $price;
        $this->session = $session;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.session')->with([
            'session'=>$this->session,
            'description'=>$this->description,
            'price'=>$this->price,
            'userName'=>$this->userName,
        ]);
    }
}
