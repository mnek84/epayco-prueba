Registro Clientes: Crear un método llamado registro cliente donde reciba los
siguientes parámetros
• Documento
• Nombres,
• Email,
• Celular
Se debe registrar el usuario, todos los campos son requeridos, el soap debe dar
como resultado un mensaje con su respectivo código de error y mensaje de éxito o
fallo.
Recarga Billetera:
Se debe permitir cargar la billetera enviando el documento, número de celular y
valor, se debe responder un mensaje de éxito o fallo.
Pagar
La billetera con saldo debe permitir pagar una compra enviada, pero para
descontar el saldo el sistema deberá́ generar un token de 6 dígitos el cual deben
de confirmar enviando un id de sesión y el token. Se sugiere enviar el token al
email del usuario registrado.
Si todo es correcto se genera un mensaje y una respuesta diciendo que se ha
enviado un correo más el id de sesión que debe ser usado en la confirmación de la
compra. 
