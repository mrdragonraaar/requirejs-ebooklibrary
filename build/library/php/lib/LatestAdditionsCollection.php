<?php
/**
 * LatestAdditionsCollection.php
 *
 * Represents a collection of latest book files.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'LatestAdditionsCollection.php')
	die('You cannot load this page directly.');

require_once('RecursiveBookCollection.php');

/**
 * LatestAdditionsCollection
 *
 * Represents a collection of latest book files.
 */
class LatestAdditionsCollection extends RecursiveBookCollection
{
	protected $max = 20;	// maximum amount of books

	/**
	 * Create a new LatestAdditionsCollection instance.
	 * @param $booksRoot path to books directory.
	 * @param $max maximum amount of books.
	 */
	function __construct($booksRoot, $max = 20)
	{
		if ($this->_init($booksRoot, $max))
		{
			$this->addFiles();
		}
	}

	/**
	 * Initialise LatestAdditionsCollection instance.
	 * @param $booksRoot path to books directory.
	 * @param $max maximum amount of books.
	 * @return boolean
	 */
	protected function _init($booksRoot, $max)
	{
		if (parent::_init($booksRoot) && $max)
		{
			$this->max = $max;

			return true;
		}

		return false;
	}

	/**
	 * Add book files to collection.
	 * @return boolean
	 */
	public function addFiles()
	{
		if (parent::addFiles())
		{
			$this->_latestBooks();

			return true;
		}

		return false;
	}

	/**
	 * Filter book files to latest additions.
	 */
	private function _latestBooks()
	{
		$this->_sortBooksCTime();
		$this->_sliceBooksMax();
		$this->_loadBooks();
	}

	/**
	 * Sort book files by creation time.
	 */
	private function _sortBooksCTime()
	{
		uasort($this->files, array('self', '_compareCTime'));
	}

	/**
	 * Sort comparator for creation time.
	 */
	private static function _compareCTime($a, $b)
	{
		if ($a->fileInfo()->ctime() === $b->fileInfo()->ctime())
			return 0;

		return ($a->fileInfo()->ctime() < $b->fileInfo()->ctime()) ? 1 : -1;
	}

	/**
	 * Reduce book files list to maximum.
	 */
	private function _sliceBooksMax()
	{
		if (count($this->files) > $this->max)
			$this->files = array_slice($this->files, 0, $this->max);
	}

	/**
	 * Load book information for all book files.
	 */
	private function _loadBooks()
	{
		foreach ($this->files as $book)
			$book->load_mobi();
	}
}

?>
