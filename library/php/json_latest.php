<?php
/**
 * json_latest.php
 *
 * Display latest additions JSON.
 * @usage	json_latest.php?max=MAX
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/LatestAdditionsCollection.php');
require_once('config.php');

$MAX = isset($_GET['max']) ? $_GET['max'] : 20;

$latest = new LatestAdditionsCollection($_EBOOKLIBRARY['BOOKS_ROOT'], $MAX);

header("Content-Type: application/json; charset=UTF-8");
echo $latest->toJSON();
?>
