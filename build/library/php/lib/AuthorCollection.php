<?php
/**
 * AuthorCollection.php
 *
 * Represents a collection of author directories.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'AuthorCollection.php')
	die('You cannot load this page directly.');

require_once('FileCollection.php');
require_once('Author.php');

/**
 * AuthorCollection
 *
 * Represents a collection of author directories.
 */
class AuthorCollection extends FileCollection
{
	protected $booksRoot = '';	// path to books directory

	/**
	 * Create a new AuthorCollection instance.
	 * @param $booksRoot path to books directory.
	 */
	function __construct($booksRoot)
	{
		if ($this->_init($booksRoot))
		{
			$this->addFiles();
		}
	}

	/**
	 * Initialise AuthorCollection instance.
	 * @param $booksRoot path to books directory.
	 * @return boolean
	 */
	protected function _init($booksRoot)
	{
		if (is_dir(self::_fullPath($booksRoot)))
		{
			$this->booksRoot = $booksRoot;

			return true;
		}

		return false;
	}

	/**
	 * Generate full path.
	 * @param $booksRoot path to books directory.
	 * @return full path
	 */
	protected static function _fullPath($booksRoot)
	{
		return rtrim($booksRoot, '/') . '/';
	}

	/**
	 * Get full path to directory of author directories.
	 * @return full path
	 */
	public function fullPath()
	{
		return self::_fullPath($this->booksRoot);
	}

	/**
	 * Add author directory to collection.
	 * @param $fileName name of author directory to add.
	 */
	protected function _addFile($fileName)
	{
		$author = new Author($this->booksRoot, $fileName);
		if ($author->fullPath() && is_dir($author->fullPath()))
		{
			$this->files[] = $author;
		}
	}
}

?>
