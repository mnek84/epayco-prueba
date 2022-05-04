<?php

namespace App\Jobs;

use App\Mail\SessionIntentEmail;
use App\Models\OperationToken;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendSessionIntentToUserMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $operationToken;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(OperationToken $operationToken)
    {
        $this->operationToken = $operationToken;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $destinationMail = $this->operationToken->user->email;

        Mail::to($destinationMail)->send(new SessionIntentEmail(
            $this->operationToken->user->name,
            $this->operationToken->description,
            $this->operationToken->price,
            $this->operationToken->session
        ));

    }
}
