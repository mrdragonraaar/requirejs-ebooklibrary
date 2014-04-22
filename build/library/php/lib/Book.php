<?php
/**
 * Book.php
 *
 * Represents a book file.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'Book.php')
	die('You cannot load this page directly.');

require_once('Series.php');
require_once('mobipocket/mobipocket.php');

/**
 * BookInfo
 *
 * Represents a books information.
 */
class BookInfo implements JsonSerializable
{
	private $_mobi = null;		// mobipocket

	public function __construct()
	{
		$this->_init();
	}

	protected function _init()
	{
		$this->_mobi = new mobipocket();
	}

	/**
	 * Load book information.
	 * @param $fullPath full path to file.
	 * @return boolean
	 */
	public function load($fullPath)
	{
		return $this->_mobi->load($fullPath);
	}

	/**
	 * Mobipocket property mappings.
	 */
	/* Title */
	public function title() { return $this->_mobi->title(); }
	/* Title Sort */
	public function titleSort() { return $this->_mobi->title_sort(); }
	/* Author */
	public function author() { return $this->_mobi->authors(); }
	/* Author Sort */
	public function authorSort() { return $this->_mobi->authors_sort(); }
	/* Cover */
	public function cover() { return 'data:image/png;base64,' . base64_encode($this->_mobi->cover()); }
	/* Description */
	public function description() { return $this->_mobi->description(); }
	/* Publisher */
	public function publisher() { return $this->_mobi->publisher(); }
	/* Publishing Date */
	public function publishingDate() { return $this->_mobi->publishing_date_str('Y-m-d'); }
	/* ISBN */
	public function isbn() { return (float)$this->_mobi->isbn(); }
	/* Subject */
	public function subject() { return $this->_mobi->subjects(); }
	/* Language */
	public function language() { return $this->_mobi->language(); }
	/* Contributor */
	public function contributor() { return $this->_mobi->contributor(); }
	/* Creator Software */
	public function creatorSoftware() { return $this->_mobi->creator_software_full_str(); }

	/**
	 * Get book text.
	 * @return book text
	 */
	public function html()
	{
		return $this->_mobi->html();
	}

	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		return [
			'title' => $this->title(),
			'titleSort' => $this->titleSort(),
			'author' => $this->author(),
			'authorSort' => $this->authorSort(),
			'cover' => $this->cover(),
			'description' => $this->description(),
			'publisher' => $this->publisher(),
			'publishingDate' => $this->publishingDate(),
			'isbn' => $this->isbn(),
			'subject' => $this->subject(),
			'language' => $this->language(),
			'contributor' => $this->contributor(),
			'creatorSoftware' => $this->creatorSoftware()
		];
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

/**
 * Book
 *
 * Represents a book file.
 */
class Book extends Series
{
	protected $bookInfo;	// reference to BookInfo object

	/**
	 * Initialise Book instance.
	 * @param $booksRoot path to books directory.
	 * @param $authorName name of author directory.
	 * @param $seriesName name of series directory.
	 * @param $name name of book file.
	 * @return boolean
	 */
	protected function _init($booksRoot, $authorName, $seriesName, $name)
	{
		if (parent::_init($booksRoot, $authorName, $seriesName, $name))
		{
			$this->bookInfo = new BookInfo();

			return true;
		}

		return false;
	}

	/**
	 * Check if this book is a mobipocket file.
	 * @return boolean
	 */
	public function is_mobi()
	{
		return $this->fullPath && is_file($this->fullPath) && 
		   pathinfo($this->fullPath, PATHINFO_EXTENSION) === 'mobi';
	}

	/**
	 * Load mobipocket book information.
	 * @return boolean
	 */
	public function load_mobi()
	{
		if ($this->fullPath)
		{
			return $this->bookInfo->load($this->fullPath);
		}

		return false;
	}

	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		$json = parent::jsonSerialize();
		$json['bookInfo'] = $this->bookInfo;
		return $json;
	}
}

?>
