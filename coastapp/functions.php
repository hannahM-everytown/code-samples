<?php
/**
 * Theme settings and configurations.
 *
 * Theme: Coast App
 * @package coastapp
 */

if(!class_exists('Timber')) {
  add_action('admin_notices', function() {
    echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
  });
  add_filter('template_include', function($template) {
    return get_stylesheet_directory() . '/no-timber.html';
  });
  return;
}

Timber::$locations = get_template_directory() . '/views';
Timber::$dirname = 'views';
Timber::$autoescape = false;

class CoastAppSite extends Timber\Site {

  public function __construct(){
    add_action('init', array($this, 'register_menus'));
    add_action('init', array($this, 'register_customer'));
    
    add_action('after_setup_theme', array($this, 'theme_supports'));
    add_action('wp_enqueue_scripts', array($this, 'enqueue_coastapp_scripts'));
    add_action('login_head', array($this, 'coastapp_custom_login_page'));

    add_filter('timber/context', array($this, 'add_to_context'));
    add_filter('use_block_editor_for_post_type', array($this, '__return_false', 10,2));
    add_filter( 'login_headerurl', array($this, 'coastapp_login_logo_url'));
    add_filter( 'login_headertitle', array($this, 'coastapp_login_logo_url_title'));

    parent::__construct();
  }
  
  public function enqueue_coastapp_scripts() {
    if(!is_admin()) {
      wp_enqueue_style('styles', get_template_directory_uri() . '/dist/css/app.min.css', '', '1.0');
      // we need to enqueue swiper because webpack is importing this file after site.js. 
      wp_enqueue_script('swiper', get_template_directory_uri() . '/dev/js/vendor/swiper.min.js', '', '5.0.4', true);
        wp_enqueue_script('main', get_template_directory_uri() . '/dist/js/app.min.js', '', '1.0', true);
    }
  }

  public function coastapp_custom_login_page() {
    echo '<link rel="stylesheet" type="text/css" href="' . get_template_directory_uri()  . '/dist/css/coast_login.css" />';
  }

  public function coastapp_login_logo_url() {
    return home_url();
  }

  function coastapp_login_logo_url_title() {
    return 'Your Site Name and Info';
  }

  public function register_menus() {
    register_nav_menus(array(
      'main_menu' => __('Main Menu', 'coastapp'),
      'footer_menu' => __('Footer Menu', 'coastapp'),
    ));
  }

  public function theme_supports() {
    if (!function_exists( 'theme_supports')) {
      add_theme_support('menus');
      add_theme_support('post-thumbnails');
      add_theme_support('title-tag');
    }
  }

  public function register_customer() {
    $labels = array(
      'name'                => _x( 'Customer', 'Post Type General Name', 'coastapp' ),
      'singular_name'       => _x( 'Customer', 'Post Type Singular Name', 'coastapp' ),
      'menu_name'           => __( 'Customer', 'coastapp' ),
      'parent_item_colon'   => __( 'Parent Item:', 'coastapp' ),
      'all_items'           => __( 'All Customers', 'coastapp' ),
      'view_item'           => __( 'View Customer', 'coastapp' ),
      'add_new_item'        => __( 'Add New Customer', 'coastapp' ),
      'add_new'             => __( 'Add New', 'coastapp' ),
      'edit_item'           => __( 'Edit Customer', 'coastapp' ),
      'update_item'         => __( 'Update Customer', 'coastapp' ),
      'search_items'        => __( 'Search Customers', 'coastapp' ),
      'not_found'           => __( 'Not found', 'coastapp' ),
      'not_found_in_trash'  => __( 'Not found in Trash', 'coastapp' ),
    );

    $args = array(
      'label'               => __( 'Customers', 'coastapp' ),
      'description'         => __( 'Customer reviews and testimonials for the Coast App product', 'coastapp' ),
      'labels'              => $labels,
      'supports'            => array( ),
      'taxonomies'          => array( 'category', 'post_tag' ),
      'hierarchical'        => false,
      'public'              => true,
      'show_ui'             => true,
      'show_in_menu'        => true,
      'show_in_nav_menus'   => true,
      'show_in_admin_bar'   => true,
      'menu_position'       => 5,
      'menu_icon'           => 'dashicons-heart',
      'can_export'          => true,
      'has_archive'         => true,
      'exclude_from_search' => false,
      'publicly_queryable'  => true,
      'capability_type'     => 'post',
      'supports' => array('title', 'editor', 'thumbnail')
    );
    
    register_post_type('customer', $args);
  }  

  public function add_to_context($context) {
    $context['main_menu'] = new \Timber\Menu('main-menu');
    $context['footer_menu'] = new \Timber\Menu('footer-menu');
    $context['imgix_link'] = 'https://coast-wp.imgix.net';
    $context['environment'] = $this->get_environment($env);
    $context['site'] = $this;

    return $context;
  }

  public function get_environment($env) {

    if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == 'coastapp.com') {
      $env = "prod";
    } elseif (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == 'coastapp.wpengine.com') {
      $env = "staging";
    } else {
      $env = "dev";
    }
    
    return $env;
  }

}

new CoastAppSite();
