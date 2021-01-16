<?php

echo "welcome";
$json = file_get_contents('php://input');
////$dj= json_decode([{"hey":"there"},{"me":"too"}],true);
print_r($json);
if($_SERVER['REQUEST_METHOD']=='POST'){
    echo "Got request";
}