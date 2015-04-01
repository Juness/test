<?php
/*
Template Name: Page Slider
*/

define('IS_FULLWIDTH', TRUE);
get_header(); ?>

<?
$args = array(
	'sort_order' => 'ASC',
	'sort_column' => 'post_title',
	'hierarchical' => 1,
	'exclude' => '',
	'include' => '',
	'meta_key' => '',
	'meta_value' => '',
	'authors' => '',
	//'child_of' => $post->post_parent,
	'child_of' => $post->ID,
	'parent' => -1,
	'exclude_tree' => '',
	'number' => '',
	'offset' => 0,
	'post_type' => 'page',
	'post_status' => 'publish'
);
$slider_pages = get_pages($args);
?>



<?php if (have_posts()) : while(have_posts()) : the_post(); ?>
	<?php get_template_part( 'templates/pagehead' ); ?>

<?php
$content = apply_filters( 'the_content', get_the_content() );
$content = str_replace( ']]>', ']]&gt;', $content );
?>
<div id="slideshow">
    <div id="slideshowWindow">

		<?$i = 0;?>
		<?foreach ($slider_pages as $post ) : setup_postdata( $post ); ?>

				 <div class="slide" id="pageSlide<?echo $i?>">

				<?php the_content(); ?>
				<?$i++;?>
				</div>

		<?endforeach;?>


    </div><!--/slideshowWindow-->
</div><!--/slideshow-->
<div class="parent-page-content">
<?echo $content; ?>

</div>
<div style="clear:both"></div>

<?
wp_enqueue_script(
		'pageslider',
		get_stylesheet_directory_uri() . '/js/pageslider.js',
		array( 'jquery' ),
		true
	);
?>

<?php endwhile; else : ?>
	<?php _e('No posts were found.', 'us'); ?>
<?php endif; ?>
<?php get_footer(); ?>