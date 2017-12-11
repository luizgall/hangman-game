<?php
$escolha = $_POST["funcao"];
header("Content-Type: text/html; charset=ISO-8859-1");
    if ($escolha == "recebeTabela"){
        recebeTabela();
    }elseif ($escolha== "enviarPontos"){
        enviaPontos();
    }elseif($escolha == "escolherPalavra"){
        escolherPalavra();
    }elseif($escolha == "numeroPalavras"){
        numeroPalavras();
    }    


function recebeTabela(){
$servername = "localhost";
$username = "llagc495_ler";
$password = "";
$dbname = "llagc495_enforcadoPalavras";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}   
$sql = "SELECT NOME, PONTOS FROM PONTUACAO ORDER BY PONTOS DESC LIMIT 10";
$result = mysqli_query($conn, $sql);
    // output data of each row
   echo "<table><tr><th> NOME </th> <th> PONTOS </th> </tr> <caption>TOP 10</caption>";

    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr> <td>" . $row["NOME"]. "</td><td> " . $row["PONTOS"]."</td></td>";
    }
   echo "</table>";

mysqli_close($conn);
}

function enviaPontos (){
$servername = "localhost";
$username = "llagc495_escreve";
$password = "";
$dbname = "llagc495_enforcadoPalavras";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$nome =$_POST["nome"];
$pontos =$_POST ["pontos"];
$sql = "INSERT INTO PONTUACAO(NOME, PONTOS)
VALUES ('$nome', '$pontos')";


if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);
}

function escolherPalavra(){
    $servername = "localhost";
$username = "llagc495_ler";
$password = "";
$dbname = "llagc495_enforcadoPalavras";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$palavraID = $_POST["id"];
$sql = "SELECT PALAVRA FROM PALAVRAS WHERE ID = $palavraID";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
echo $row["PALAVRA"];
mysqli_close($conn);
}

function numeroPalavras(){
     $servername = "localhost";
$username = "llagc495_ler";
$password = "";
$dbname = "llagc495_enforcadoPalavras";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$palavraID = $_POST["id"];
$sql = "    SELECT * 
FROM PALAVRAS
ORDER BY ID DESC
LIMIT 1";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
echo $row["ID"];
mysqli_close($conn);
}?>