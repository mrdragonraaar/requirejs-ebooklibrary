<?php
/**
 * SearchCollection.php
 *
 * Represents a collection of searched book files.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'SearchCollection.php')
	die('You cannot load this page directly.');

require_once('RecursiveBookCollection.php');

/**
 * SearchCollection
 *
 * Represents a collection of searched book files.
 */
class SearchCollection extends RecursiveBookCollection
{
	protected $search = '';		// search query

	/**
	 * Create a new SearchCollection instance.
	 * @param $booksRoot path to books directory.
	 * @param $search search query.
	 */
	function __construct($booksRoot, $search)
	{
		if ($this->_init($booksRoot, $search))
		{
			$this->addFiles();
		}
	}

	/**
	 * Initialise SearchCollection instance.
	 * @param $booksRoot path to books directory.
	 * @param $search search query.
	 * @return boolean
	 */
	protected function _init($booksRoot, $search)
	{
		if (parent::_init($booksRoot) && $search)
		{
			$this->search = $search;

			return true;
		}

		return false;
	}

	/**
	 * Add book file to collection.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of series directory.
	 * @param $fileName name of book file.
	 * @return book file
	 */
	protected function _addBook($booksRoot, $authorName, $seriesName, $fileName)
	{
		if (strpos($fileName, $this->search) !== false)
		{
			if ($book = parent::_addBook($booksRoot, $authorName, $seriesName, $fileName))
			{
				return $book->load_mobi();
			}
		}

		return null;
	}
}

?>
