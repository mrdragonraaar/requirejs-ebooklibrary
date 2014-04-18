<?php
/**
 * json_search.php
 *
 * Display search JSON.
 * @usage	json_search.php?search=SEARCH
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/SearchCollection.php');
require_once('config.php');

$SEARCH = isset($_GET['search']) ? $_GET['search'] : '';

$search = new SearchCollection($_EBOOKLIBRARY['BOOKS_ROOT'], $SEARCH);

header("Content-Type: application/json; charset=UTF-8");
echo $search->toJSON();
?>
