<?php
/**
 * json_series.php
 *
 * Display series JSON.
 * @usage	json_series.php?author=AUTHOR&series=SERIES
 *
 * (c)2014 mrdragonraaar.com
 */
require_once('lib/SeriesCollection.php');
require_once('config.php');

$AUTHOR_NAME = isset($_GET['author']) ? $_GET['author'] : '';
$SERIES_NAME = isset($_GET['series']) ? $_GET['series'] : '';

$series = new SeriesCollection($_EBOOKLIBRARY['BOOKS_ROOT'], $AUTHOR_NAME, $SERIES_NAME);

header("Content-Type: application/json; charset=UTF-8");
echo $series->toJSON();
?>
