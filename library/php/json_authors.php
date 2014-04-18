<?php
/**
 * json_authors.php
 *
 * Display authors JSON.
 * @usage	json_authors.php
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/AuthorCollection.php');
require_once('config.php');

$authors = new AuthorCollection($_EBOOKLIBRARY['BOOKS_ROOT']);

header("Content-Type: application/json; charset=UTF-8");
echo $authors->toJSON();
?>
