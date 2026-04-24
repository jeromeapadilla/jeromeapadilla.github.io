<?php 
//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//First load the DB connection
require_once("db_connect.php");

if ($db_connect) {
    // SQL query
    // $sql = "???";
    $sql = "SELECT * FROM demo_table_1";

    // Array to translate to json
    $rArray = array();

    if ($stmt = $db_connect->prepare($sql)) {
        //Prepare input
        /* ??? HERE Collect the data from the HTML form using $_REQUEST[] */
        //Here it is important to follow the order in the bind_param, be careful to not change things
        // $stmt->bind_param(/* ??? */);//Here put the code to setup the bind_param

        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($id, $name, $email, $address); //Here put the code to setup the bind_result

        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "id" => $id,
                "name" => $name,
                "email" => $email,
                "address" => $address
            ];
        }
                
        $stmt->close();        
   
    }
    else {
        //Inform user if error
        $rArray[] = [
            "error"=>"No execute statement. Query Error - Double check your query and inputs"
        ];
    }

    $db_connect->close();
}
else {
    //Inform user if error
    $rArray[] = [
        "error"=> "Connection Error: " . mysqli_connect_error(),
    ];
}

echo json_encode($rArray);

?>