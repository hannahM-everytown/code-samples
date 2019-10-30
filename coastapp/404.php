<?php
/**
 * The template for displaying 404 Page Not Found.
 *
 * Theme: Coast App
 * @package coastapp
 */

$context = Timber::context();
$context['post'] = new TimberPost();

Timber::render( 'pages/404.twig', $context );
