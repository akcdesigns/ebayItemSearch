<?php

$str = $_POST['searchStr'];
$url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=IanLivin-PostageA-PRD-c2eae7200-e5cc38db&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${str}&GLOBAL-ID=EBAY-GB&siteid=3";

$executionStartTime = microtime(true);

$ch = curl_init();

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result);

$output['status']['code'] = '200';
$output['status']['name'] = 'ok';
$output['status']['description'] = 'success';
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . 'ms';
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);