<?php
/**
 * Timber context for single post.
 * 
 * Theme: Coast App
 * @package coastapp
 */

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render('pages/single.twig', $context);

