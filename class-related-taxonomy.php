<?php
/**
 * The plugin bootstrap file.
 *
 * @link        https://github.com/rtCamp/gutenberg-block-components
 * @since       1.0.0
 * @package     Related_Taxonomies
 *
 * Plugin Name: Gutenberg Block - Related Taxonomy
 * Author:      Adarsh Verma
 * Author URI:  https://github.com/vermadarsh/
 * Version:     1.0.0
 * Description: This plugin creates custom gutenberg block for showing related taxonomies (tags) for any post/page.
 * Text Domain: custom-gutenberg-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'GBRT_PLUGIN_URL' ) ) {
	define( 'GBRT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

/**
 * Check if the defined class `Related_Taxonomies` already exists.
 */
if ( ! class_exists( 'Related_Taxonomies' ) ) {

	/**
	 * Main class.
	 *
	 * This is used to define all the hooks used in the creation of custom blocks.
	 *
	 * @since      1.0.0
	 * @package    Related_Taxonomies
	 * @author     Adarsh Verma <adarsh.verma@rtcamp.com>
	 */
	class Related_Taxonomies {

		/**
		 * Related_Taxonomies constructor.
		 */
		public function __construct() {

			add_filter( 'block_categories', array( $this, 'gbrt_block_categories' ) );
			add_action( 'init', array( $this, 'gbrt_initialize' ) );

		}

		/**
		 * Adding a custom category for Gutenberg blocks.
		 *
		 * @param array $categories Block category pre-defined array.
		 *
		 * @return array
		 */
		public function gbrt_block_categories( $categories = array() ) {

			$category_slug  = 'rt-cgb';
			$category_slugs = wp_list_pluck( $categories, 'slug' );

			return in_array( $category_slug, $category_slugs, true ) ? $categories : array_merge(
				$categories,
				array(
					array(
						'slug'  => $category_slug,
						'title' => apply_filters( 'gbtoc_gutenberg_block_category', __( 'rtCamp Custom Gutenberg Blocks', 'gbtoc' ) ),
						'icon'  => 'smiley',
					),
				)
			);

		}

		/**
		 * This function helps in registering block and it's corresponding scripts.
		 */
		public function gbrt_initialize() {
			/* Register Javascript File build/index.js */
			wp_register_script(
				'related-taxonomies-js',
				plugins_url( 'build/index.js', __FILE__ ),
				array( 'wp-blocks', 'wp-editor', 'wp-element', 'wp-i18n', 'wp-data', 'wp-components' ),
				filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
				true
			);

			/* Register Editor Style: src/editor.css */
			wp_register_style(
				'related-taxonomies-editor-css',
				plugins_url( 'src/editor.css', __FILE__ ),
				array( 'wp-edit-blocks' ),
				filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
			);

			/* Register Frontend Style: src/style.css */
			wp_register_style(
				'related-taxonomies-frontend-css',
				plugins_url( 'src/style.css', __FILE__ ),
				array( 'wp-edit-blocks' ),
				filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
			);

			register_block_type(
				'related-taxonomy/related-taxonomies',
				array(
					'editor_script'   => 'related-taxonomies-js',
					'editor_style'    => 'related-taxonomies-editor-css',
					'style'           => 'related-taxonomies-frontend-css',
					'render_callback' => array( $this, 'gbrt_block_render' ),
					'attributes'      => array(
						'tags'        => array(
							'type'    => 'json'
						)
					)
				)
			);
		}

		function gbrt_block_render( $attributes ) {

			// debug( $attributes );
			ob_start();
			?>
			<div class="gbrt-related-taxonomies-block">
				<h2><?php echo ( isset( $attributes['block_title'] ) ) ? wp_kses_post( $attributes['block_title'] ) : ''; ?></h2>
				<?php if( ! empty( $attributes['tags']  && is_array( $attributes['tags'] )) ) { ?>
					<?php foreach( $attributes['tags'] as $tag ) { ?>
						<span data-tagid="<?php echo esc_attr( $tag['id'] ); ?>">
							<a href="<?php echo esc_url( $tag['link'] ); ?>"><?php echo wp_kses_post( $tag['name'] ); ?></a>
						</span>
					<?php } ?>
				<?php } ?>
			</div>
			<?php
			return ob_get_clean();

		}

	}

	new Related_Taxonomies();
}

if ( ! function_exists( 'debug' ) ) {
	function debug( $params ) {
		echo '<pre>';
		print_r( $params );
		echo '</pre>';
	}
}