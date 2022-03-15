<?php

if (isset($_POST['nom'])){
    $message = "Ce message vous a été envoyé via la page contact du site
     lucashuerta.fr
    Nom : ". $_POST["nom"]."
    Email : ". $_POST["mail"]."
    Message : ". $_POST["message"];

    $retour = mail("huertalucas13@gmail.com",
        "Mail PORTFOLIO",
        $message,
      "From:contact@portfolio.fr". "\r\n".
      "Reply-to:" . $_POST["mail"]);
    header('Location:https://test.lucashuerta.fr/pages/About.html');
}
