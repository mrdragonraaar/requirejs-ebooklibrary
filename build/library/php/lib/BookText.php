<?php
/**
 * BookText.php
 *
 * Represents the text of a book file.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'BookText.php')
	die('You cannot load this page directly.');

require_once('Book.php');

/**
 * BookText
 *
 * Represents the text of a book file.
 */
class BookText extends Book
{
	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		$json = parent::jsonSerialize();
		$json['text'] = $this->bookInfo->html();
		return $json;
	}
}
?>
