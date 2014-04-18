<?php
/**
 * Link.php
 *
 * Represents a link.
 *
 * (c)2014 mrdragonraaar.com
 */
if (basename($_SERVER['PHP_SELF']) == 'Link.php')
	die('You cannot load this page directly.');

/**
 * Url
 *
 * Represents an url of a link.
 */
class Url implements JsonSerializable
{
	protected $label = '';	// url label
	protected $href = '';	// url href

	/**
	 * Create a new Url instance.
	 * @param $label label of url.
	 * @param $href href of url.
	 */
	function __construct($label, $href)
	{
		$this->_init($label, $href);
	}

	/**
	 * Initialise Url instance.
	 * @param $label label of url.
	 * @param $href href of url.
	 */
	protected function _init($label, $href)
	{
		$this->label = $label;
		$this->href = $href;
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
			'label' => $this->label,
			'href' => $this->href
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
 * Link.php
 *
 * Represents a link.
 */
class Link implements JsonSerializable
{
	protected $title = '';		// link title
	protected $icon = '';		// link icon url
	protected $urls = array();	// link urls

	/**
	 * Create a new Link instance.
	 * @param $title title of link.
	 * @param $icon icon url of link.
	 */
	function __construct($title, $icon = '')
	{
		$this->_init($title, $icon);
	}

	/**
	 * Initialise Link instance.
	 * @param $title title of link.
	 * @param $icon icon url of link.
	 */
	protected function _init($title, $icon)
	{
		$this->title = $title;
		$this->icon = $icon;
	}

	/**
	 * Add a url to link.
	 * @param $label label of url.
	 * @param $href href of url.
	 */
	public function addUrl($label, $href)
	{
		$this->urls[] = new Url($label, $href);
	}

	/**
	 * Allow object to be serialized by json_encode().
	 * @return object data
	 */
	public function jsonSerialize()
	{
		return [
			'title' => $this->title,
			'icon' => $this->icon,
			'urls' => $this->urls
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
