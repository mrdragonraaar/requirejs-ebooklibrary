<?php
/**
 * Series.php
 *
 * Represents a series directory.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'Series.php')
	die('You cannot load this page directly.');

require_once('Author.php');

/**
 * Series
 *
 * Represents a series directory.
 */
class Series extends Author
{
	protected $authorName = '';	// name of author directory
	protected $seriesName = '';	// name of series directory

	/**
	 * Create a new Series instance.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of parent series directory.
	 * @param $name name of series directory.
	 */
	function __construct($booksRoot, $authorName, $seriesName, $name)
	{
		$this->_init($booksRoot, $authorName, $seriesName, $name);
	}

	/**
	 * Initialise Series instance.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of parent series directory.
	 * @param $name name of series directory.
	 * @return boolean
	 */
	protected function _init($booksRoot, $authorName, $seriesName, $name)
	{
		if (parent::_init(self::_parentPath($booksRoot, $authorName, $seriesName), $name))
		{
			$this->authorName = $authorName;
			$this->seriesName = $seriesName;

			return true;
		}

		return false;
	}

	/**
	 * Generate parent path.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of parent series directory.
	 * @return parent path
	 */
	protected static function _parentPath($booksRoot, $authorName, $seriesName)
	{
		$parentPath = parent::_parentPath($booksRoot);

		if ($authorName)
		{
			$parentPath .= $authorName . '/';
		}

		if ($seriesName)
		{
			$parentPath .= $seriesName . '/';
		}

		return $parentPath;
	}

	/**
	 * Generate full path.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of parent series directory.
	 * @param $name name of series directory.
	 * @return full path
	 */
	protected static function _fullPath($booksRoot, $authorName, $seriesName, $name)
	{
		return self::_parentPath($booksRoot, $authorName, $seriesName) . $name;
	}

	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		$json = parent::jsonSerialize();
		$json['authorName'] = $this->authorName;
		$json['seriesName'] = $this->seriesName;
		return $json;
	}
}

?>
