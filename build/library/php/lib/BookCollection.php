<?php
/**
 * BookCollection.php
 *
 * Represents a collection of book files.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'BookCollection.php')
	die('You cannot load this page directly.');

require_once('SeriesCollection.php');
require_once('Book.php');

/**
 * BookCollection
 *
 * Represents a collection of book files.
 */
class BookCollection extends SeriesCollection
{
	/**
	 * Add book file to collection.
	 * @param $fileName name of book file to add.
	 */
	protected function _addFile($fileName)
	{
		$book = new Book($this->booksRoot, $this->authorName, $this->seriesName, $fileName);
		if ($book->is_mobi())
		{
			$book->load_mobi();
			$this->files[] = $book;
		}
	}
}

?>
