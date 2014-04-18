<?php
/**
 * RecursiveBookCollection.php
 *
 * Represents a recursive collection of book files.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'RecursiveBookCollection.php')
	die('You cannot load this page directly.');

require_once('Book.php');

/**
 * RecursiveBookCollection
 *
 * Represents a recursive collection of book files.
 */
class RecursiveBookCollection implements JsonSerializable
{
	protected $files = array();	// files array
	protected $booksRoot = '';	// path to books directory

	/**
	 * Create a new RecursiveBookCollection instance.
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
	 * Initialise RecursiveBookCollection instance.
	 * @param $booksRoot path to books directory.
	 * @return boolean
	 */
	protected function _init($booksRoot)
	{
		if ($booksRoot && is_dir($booksRoot))
		{
			$this->booksRoot = $booksRoot;

			return true;
		}

		return false;
	}

	/**
	 * Generate full path.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of series directory.
	 * @param $fileName name of file.
	 * @return full path
	 */
	protected static function _fullPath($booksRoot, $authorName = '', $seriesName = '', $fileName = '')
	{
		$fullPath = rtrim($booksRoot, '/') . '/';

		if ($authorName)
		{
			$fullPath .= $authorName . '/';
		}

		if ($seriesName)
		{
			$fullPath .= $seriesName . '/';
		}

		if ($fileName)
		{
			$fullPath .= $fileName;
		}

		return $fullPath;
	}

	/**
	 * Add book files to collection.
	 * @return boolean
	 */
	public function addFiles()
	{
		return $this->_addFiles($this->booksRoot);
	}

	/**
	 * Add book files to collection.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of series directory.
	 * @return boolean
	 */
	protected function _addFiles($booksRoot, $authorName = '', $seriesName = '')
	{
		$directory = self::_fullPath($booksRoot, $authorName, $seriesName);

		if ($directory && is_dir($directory) &&
		   ($dh = opendir($directory)))
		{
			while (false !== ($fileName = readdir($dh)))
			{
				if ($fileName === '.' || $fileName === '..')
					continue;

				$this->_addFile($booksRoot, $authorName, $seriesName, $fileName);
			}

			closedir($dh);

			return true;
		}

		return false;
	}

	/**
	 * Add directory or book file to collection.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of series directory.
	 * @param $fileName name of file.
	 */
	protected function _addFile($booksRoot, $authorName, $seriesName, $fileName)
	{
		$fullPath = self::_fullPath($booksRoot, $authorName, $seriesName, $fileName);

		if (is_dir($fullPath))
			$this->_addDir($booksRoot, $authorName, $seriesName, $fileName);
		else
			$this->_addBook($booksRoot, $authorName, $seriesName, $fileName);
	}

	/**
	 * Add directory to collection.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of series directory.
	 * @param $fileName name of directory.
	 */
	protected function _addDir($booksRoot, $authorName, $seriesName, $fileName)
	{
		if ($authorName)
			if ($seriesName)
				$seriesName .= '/' . $fileName;
			else
				$seriesName = $fileName;
		else
			$authorName = $fileName;

		$this->_addFiles($booksRoot, $authorName, $seriesName);
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
		$book = new Book($booksRoot, $authorName, $seriesName, $fileName);
		if ($book->is_mobi())
		{
			$this->files[] = $book;

			return $book;
		}

		return null;
	}

	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		return $this->files;
	}

	/**
	 * Wrapper method for json_encode().
	 * @return object JSON
	 */
	public function toJSON()
	{
		return json_encode($this);
	}
}

?>
