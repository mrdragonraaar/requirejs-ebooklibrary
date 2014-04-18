<?php
/**
 * File.php
 *
 * Represents a filesystem file.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'File.php')
	die('You cannot load this page directly.');

/**
 * FileInfo
 *
 * Represents a filesystem files information.
 */
class FileInfo implements JsonSerializable
{
	protected $name = '';	// file name
	protected $size = 0;	// file size
	protected $atime = 0;	// file access time
	protected $ctime = 0;	// file creation time
	protected $mtime = 0;	// file modified time

	/**
	 * Create a new FileInfo instance.
	 * @param $fullPath full path to file.
	 */
	function __construct($fullPath = '')
	{
		$this->_init($fullPath);
	}

	/**
	 * Initialise FileInfo instance.
	 * @param $fullPath full path to file.
	 */
	protected function _init($fullPath)
	{
		$this->name = basename($fullPath);
		$stat = stat($fullPath);
		if (!is_dir($fullPath))
		{
			$this->size = $stat['size'];
		}
		$this->atime = $stat['atime'] * 1000;
		$this->ctime = $stat['ctime'] * 1000;
		$this->mtime = $stat['mtime'] * 1000;
	}

	/**
	 * Overload method to access class properties.
	 * @param $name property name.
	 * @param $arguments not used.
	 * @return class property
	 */
	public function __call($name, $arguments)
	{
		if (property_exists($this, $name))
		{
			return $this->{$name};
		}

		$trace = debug_backtrace();
		trigger_error(
		   'Undefined property via __call(): ' . $name .
		   ' in ' . $trace[0]['file'] .
		   ' on line ' . $trace[0]['line'],
		   E_USER_NOTICE);

		return null;
	}

	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		return [
			'name' => $this->name,
			'size' => $this->size,
			'atime' => $this->atime,
			'ctime' => $this->ctime,
			'mtime' => $this->mtime
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
 * File
 *
 * Represents a filesystem file.
 */
class File implements JsonSerializable
{
	protected $fullPath = '';	// full path of file
	protected $baseName = '';	// base name of file
	protected $fileInfo;		// reference to FileInfo object

	/**
	 * Create a new File instance.
	 * @param $fullPath full path to file.
	 */
	function __construct($fullPath = '')
	{
		$this->_init($fullPath);
	}

	/**
	 * Initialise File instance.
	 * @param $fullPath full path to file.
	 * @return boolean
	 */
	protected function _init($fullPath)
	{
		$fullPath = self::_absolutePath($fullPath);
		if ($fullPath && file_exists($fullPath))
		{
			$this->fullPath = $fullPath;
			$this->baseName = basename($fullPath);
			$this->fileInfo = new FileInfo($fullPath);

			return true;
		}

		return false;
	}

	/**
	 * Removes any '.' or '..' from path.
	 * @param $path path.
	 * @return new path
	 */
	protected static function _absolutePath($path)
	{
		$path = str_replace(array('/', '\\'), DIRECTORY_SEPARATOR, $path);
		$parts = array_filter(explode(DIRECTORY_SEPARATOR, $path), 'strlen');
		$absolutes = array();
		foreach ($parts as $part)
		{
			if (('.' == $part) || ('..' == $part))
				continue;
			else
				$absolutes[] = $part;
		}

		return DIRECTORY_SEPARATOR . implode(DIRECTORY_SEPARATOR, $absolutes);
	}

	/**
	 * Overload method to access class properties.
	 * @param $name property name.
	 * @param $arguments not used.
	 * @return class property
	 */
	public function __call($name, $arguments)
	{
		if (property_exists($this, $name))
		{
			return $this->{$name};
		}

		$trace = debug_backtrace();
		trigger_error(
		   'Undefined property via __call(): ' . $name .
		   ' in ' . $trace[0]['file'] .
		   ' on line ' . $trace[0]['line'],
		   E_USER_NOTICE);

		return null;
	}

	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		return [
			'fullPath' => $this->fullPath,
			'baseName' => $this->baseName,
			'fileInfo' => $this->fileInfo
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

?>
