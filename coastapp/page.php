<?php
/**
 * Timber context for pages.
 *
 * Theme: Coast App
 * @package coastapp
 */

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render('pages/page.twig', $context);

