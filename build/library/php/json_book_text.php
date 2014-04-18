<?php
/**
 * json_book_text.php
 *
 * Display book text JSON.
 * @usage	json_book_text.php?author=AUTHOR&series=SERIES&book=BOOK
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/BookText.php');
require_once('config.php');

$AUTHOR_NAME = isset($_GET['author']) ? $_GET['author'] : '';
$SERIES_NAME = isset($_GET['series']) ? $_GET['series'] : '';
$BOOK_NAME = isset($_GET['book']) ? $_GET['book'] : '';

$book = new BookText($_EBOOKLIBRARY['BOOKS_ROOT'], $AUTHOR_NAME, $SERIES_NAME, $BOOK_NAME);
if (!$book->is_mobi() || !$book->load_mobi())
	return;

header("Content-Type: application/json; charset=UTF-8");
echo $book->toJSON();
?>
