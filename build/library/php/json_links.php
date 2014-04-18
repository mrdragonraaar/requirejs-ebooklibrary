<?php
/**
 * links.php
 *
 * Display links JSON.
 * @usage	json_links.php
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/Link.php');

$LINKS = array();

$link = new Link('Amazon', '/images/linkspanel/icon-amazon.png');
$link->addUrl('Amazon UK', 'http://amazon.co.uk');
$link->addUrl('Amazon US', 'http://amazon.com');
$LINKS[] = $link;

$link = new Link('FreeBookSpot', '/images/linkspanel/icon-freebookspot.png');
$link->addUrl('FreeBookSpot', 'http://freebookspot.es');
$LINKS[] = $link;

$link = new Link('Goodreads', '/images/linkspanel/icon-goodreads.png');
$link->addUrl('Goodreads', 'http://goodreads.com');
$LINKS[] = $link;

$link = new Link('Library Genesis', '/images/linkspanel/icon-libgen.png');
$link->addUrl('Library Genesis', 'http://gen.lib.rus.ec');
$LINKS[] = $link;

$link = new Link('Project Gutenberg', '/images/linkspanel/icon-gutenberg.png');
$link->addUrl('Project Gutenberg', 'http://www.gutenberg.org');
$link->addUrl('Project Gutenberg of Australia', 'http://gutenberg.net.au');
$link->addUrl('Project Gutenberg of Canada', 'http://gutenberg.ca');
$link->addUrl('Project Gutenberg DE', 'http://gutenberg.spiegel.de');
$LINKS[] = $link;

$link = new Link('Smashwords', '/images/linkspanel/icon-smashwords.png');
$link->addUrl('Smashwords', 'http://smashwords.com');
$LINKS[] = $link;

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($LINKS);
?>
