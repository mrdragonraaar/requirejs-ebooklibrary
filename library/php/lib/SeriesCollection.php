<?php
/**
 * SeriesCollection.php
 *
 * Represents a collection of series directories.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'SeriesCollection.php')
	die('You cannot load this page directly.');

require_once('AuthorCollection.php');
require_once('Series.php');

/**
 * SeriesCollection
 *
 * Represents a collection of series directories.
 */
class SeriesCollection extends AuthorCollection
{
	protected $authorName = '';	// name of author directory
	protected $seriesName = '';	// name of series directory

	/**
	 * Create a new SeriesCollection instance.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of parent series directory.
	 */
	function __construct($booksRoot, $authorName, $seriesName = '')
	{
		if ($this->_init($booksRoot, $authorName, $seriesName))
		{
			$this->addFiles();
		}
	}

	/**
	 * Initialise SeriesCollection instance.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of parent series directory.
	 * @return boolean
	 */
	protected function _init($booksRoot, $authorName, $seriesName)
	{
		if (is_dir(self::_fullPath($booksRoot, $authorName, $seriesName)))
		{
			$this->authorName = $authorName;
			$this->seriesName = $seriesName;

			return parent::_init($booksRoot);
		}

		return false;
	}

	/**
	 * Generate full path.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of parent series directory.
	 * @return full path
	 */
	protected static function _fullPath($booksRoot, $authorName, $seriesName)
	{
		$fullPath = parent::_fullPath($booksRoot);

		if ($authorName)
		{
			$fullPath .= $authorName . '/';
		}

		if ($seriesName)
		{
			$fullPath .= $seriesName . '/';
		}

		return $fullPath;
	}

	/**
	 * Get full path to directory of series directories.
	 * @return full path
	 */
	public function fullPath()
	{
		return self::_fullPath($this->booksRoot, $this->authorName, $this->seriesName);
	}

	/**
	 * Add series directory to collection.
	 * @param $fileName name of series directory to add.
	 */
	protected function _addFile($fileName)
	{
		$series = new Series($this->booksRoot, $this->authorName, $this->seriesName, $fileName);
		if ($series->fullPath() && is_dir($series->fullPath()))
		{
			$this->files[] = $series;
		}
	}
}

?>
