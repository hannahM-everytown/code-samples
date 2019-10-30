<?php
/**
 * The template for displaying the Homepage.
 *
 * Theme: Coast App
 * Template Name: Home
 * @package coastapp
 */

$context = Timber::get_context();
$context['post'] = new TimberPost();

// ACF fields
$context['app_features'] = get_field('app_features');
$context['icon'] = get_field('icon');
$context['image'] = get_field('image');
$context['in_control'] = get_field('in_control');
$context['customer_logos'] = get_field('customer_logos');

// Reference ACF relationship fields for reviews and testimonials
$context['reviews'] = new Timber\PostQuery(get_field('reviews'));
$context['testimonials'] = new Timber\PostQuery(get_field('testimonials'));
$context['testimonial_terms'] = new Timber\Term('testimonial');

Timber::render( 'pages/home.twig', $context );
