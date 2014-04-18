<?php
/**
 * download.php
 *
 * Download ebook.
 * @usage	download.php?author=AUTHOR&series=SERIES&book=BOOK
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/Book.php');
require_once('config.php');

$AUTHOR_NAME = isset($_GET['author']) ? $_GET['author'] : '';
$SERIES_NAME = isset($_GET['series']) ? $_GET['series'] : '';
$BOOK_NAME = isset($_GET['book']) ? $_GET['book'] : '';

$book = new Book($_EBOOKLIBRARY['BOOKS_ROOT'], $AUTHOR_NAME, $SERIES_NAME, $BOOK_NAME);
if (!$book->is_mobi())
	return;

header("Content-Type: application/x-mobipocket-ebook");
header("Content-Disposition: attachment; filename=\"" . $book->fileInfo()->name() . "\"");
header("Content-Transfer-Encoding: binary");
header("Content-Length: " . $book->fileInfo()->size());
readfile($book->fullPath());
?>
