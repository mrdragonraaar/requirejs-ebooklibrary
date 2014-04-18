<?php
/**
 * FileCollection.php
 *
 * Abstract class representing a collection of filesystem files.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'FileCollection.php')
	die('You cannot load this page directly.');

/**
 * FileCollection
 *
 * Abstract class representing a collection of filesystem files.
 */
abstract class FileCollection implements JsonSerializable
{
	protected $files = array();	// files array

	/**
	 * Get full path to directory of files.
	 * @return full path
	 */
	abstract public function fullPath();

	/**
	 * Add files to collection.
	 * @return boolean
	 */
	public function addFiles()
	{
		if ($this->fullPath() && is_dir($this->fullPath()) &&
		   ($dh = opendir($this->fullPath())))
		{
			while (false !== ($fileName = readdir($dh)))
			{
				if ($fileName === '.' || $fileName === '..')
					continue;

				$this->_addFile($fileName);
			}

			closedir($dh);

			return true;
		}

		return false;
	}

	/**
	 * Add file to collection.
	 * @param $fileName name of file to add.
	 */
	abstract protected function _addFile($fileName);

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
