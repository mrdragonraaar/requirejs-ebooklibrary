<?php
/**
 * Author.php
 *
 * Represents an author directory.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'Author.php')
	die('You cannot load this page directly.');

require_once('File.php');

/**
 * Author
 *
 * Represents an author directory.
 */
class Author extends File
{
	/**
	 * Create a new Author instance.
	 * @param $booksRoot path to books directory.
	 * @param $name name of author directory.
	 */
	function __construct($booksRoot, $name)
	{
		$this->_init($booksRoot, $name);
	}

	/**
	 * Initialise Author instance.
	 * @param $booksRoot path to books directory.
	 * @param $name name of author directory.
	 * @return boolean
	 */
	protected function _init($booksRoot, $name)
	{
		return parent::_init(self::_fullPath($booksRoot, $name));
	}

	/**
	 * Generate parent path.
	 * @param $booksRoot path to books directory.
	 * @return parent path
	 */
	protected static function _parentPath($booksRoot)
	{
		return rtrim($booksRoot, '/') . '/';
	}

	/**
	 * Generate full path.
	 * @param $booksRoot path to books directory.
	 * @param $name name of author directory.
	 * @return full path
	 */
	protected static function _fullPath($booksRoot, $name)
	{
		return self::_parentPath($booksRoot) . $name;
	}
}

?>
