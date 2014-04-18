<?php
/**
 * json_books.php
 *
 * Display books JSON.
 * @usage	json_books.php?author=AUTHOR&series=SERIES
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/BookCollection.php');
require_once('config.php');

$AUTHOR_NAME = isset($_GET['author']) ? $_GET['author'] : '';
$SERIES_NAME = isset($_GET['series']) ? $_GET['series'] : '';

$books = new BookCollection($_EBOOKLIBRARY['BOOKS_ROOT'], $AUTHOR_NAME, $SERIES_NAME);

header("Content-Type: application/json; charset=UTF-8");
echo $books->toJSON();
?>
