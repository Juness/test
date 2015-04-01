<?php
/*
Template Name: Animal Slider
*/

define('IS_FULLWIDTH', TRUE);
get_header(); ?>

<?php if (have_posts()) : while(have_posts()) : the_post(); ?>
<?php get_template_part( 'templates/pagehead' ); ?>

<?
$terms = get_the_terms( $post->id, 'us_portfolio_category' );
foreach ( $terms as $term ) {
		$post_terms[] = $term->term_id;
	}

?>
<?php $args = array(
	'posts_per_page'   => -1,
	'offset'           => 0,
	'category'         => '',
	'category_name'    => '',
	'orderby'          => 'post_date',
	'order'            => 'DESC',
	'include'          => '',
	'exclude'          => '',
	'meta_key'         => '',
	'meta_value'       => '',
	'post_type'        => 'us_portfolio',
	'post_mime_type'   => '',
	'post_parent'      => '',
	'post_status'      => 'publish',
	'suppress_filters' => true,
	'tax_query' => array(
            array(
                'taxonomy' => 'us_portfolio_category',
                'field' => 'term_id',
                'terms' => $post_terms,
            )
        )

);
$slider_pages = get_posts( $args );

?>


<div id="slideshow">
    <div id="slideshowWindow">

		<?$i = 0;?>
		<?foreach ($slider_pages as $singlepost ) : setup_postdata( $singlepost ); ?>
		<?if ($singlepost->ID == $post->ID){
			$first = $i;
			break;
		}
		else{
			array_push($slider_pages, $singlepost);
		}
		$i++;
		?>
		<?endforeach;?>

		<?$slider_pages_sorted = array_slice($slider_pages, $first);?>

		<?$i = 0;?>
		<?foreach ($slider_pages_sorted as $singlepost ) : setup_postdata( $singlepost ); ?>


				 <div class="slide" id="pageSlide<?echo $i?>">

				<?php the_content(); ?>
				<?$i++;?>
				</div>
		<?endforeach;?>


    </div><!--/slideshowWindow-->
</div><!--/slideshow-->
<div style="clear:both; margin-bottom: 40px;"></div>
<?
wp_enqueue_script(
		'animalslider',
		get_stylesheet_directory_uri() . '/js/animalslider.js',
		array( 'jquery' ),
		true
	);
?>

<?php endwhile; else : ?>
	<?php _e('No posts were found.', 'us'); ?>
<?php endif; ?>
<?php get_footer(); ?>