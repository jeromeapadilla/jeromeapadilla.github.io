<?php
//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//First load the DB connection
require_once("db_connect.php");

if ($db_connect) {
    //Build the SQL query
    /* ??? HERE Collect the data from the HTML form using $_REQUEST[] */
    $sql = "INSERT INTO demo_table (`name`, `email`, `address`) VALUES (?,?,?)";    // Write a query to add data in your table

    //This should contain 1 when the line is inserted
    $insertedRows = 0;

    //prepare statement, execute, store_result
    if ($insertStmt = $db_connect->prepare($sql)) {
        //update bind parameter types & variables as required
        //s=string, i=integer, d=double, b=blob
        $insertStmt->bind_param('sss', $_REQUEST["field1"],  $_REQUEST["field2"],  $_REQUEST["field3"]); //Here put the code to setup the bind_param

        $insertStmt->execute();
        $insertedRows += $insertStmt->affected_rows;

        if ($insertedRows > 0) {
            //return inserted row id
            $rArray[] = [
                "id"=>$insertStmt->insert_id
            ];
        } else {
            $rArray[] = [
                "error"=>"nothing inserted"
            ];
        }

        $insertStmt->close();

    } else {
        //Inform user if error
        $rArray[] = [
            "error"=>"No execute statement. Query Error - Double check your query and inputs"
        ];
    }

    $db_connect->close();

} else {
    //Inform user if error
    $rArray[] = [
        "error"=> "Connection Error: " . mysqli_connect_error(),
    ];
}

echo json_encode($rArray);

?>
