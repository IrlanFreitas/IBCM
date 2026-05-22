<?php
/**
 * IBCM — Adicionar ao functions.php do tema WordPress (ibcm.local)
 *
 * Requisito: plugin ACF (Advanced Custom Fields) instalado e ativado.
 * Download gratuito: https://wordpress.org/plugins/advanced-custom-fields/
 */

// =========================================================
// 1. CORS — permite requisições do frontend React
// =========================================================
add_action( 'rest_api_init', function () {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

	add_filter( 'rest_pre_serve_request', function ( $value ) {
		$allowed_origins = [
			'http://localhost:5173',  // Vite dev
			'http://localhost:4173',  // Vite preview
			'http://localhost:3000',  // fallback
		];

		$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

		if ( in_array( $origin, $allowed_origins, true ) ) {
			header( "Access-Control-Allow-Origin: {$origin}" );
		}

		header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
		header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
		header( 'Access-Control-Allow-Credentials: true' );

		return $value;
	} );
}, 15 );

// =========================================================
// 2. Custom Post Types
// =========================================================
add_action( 'init', function () {

	// --- Projetos ---
	register_post_type( 'projeto', [
		'labels'       => [
			'name'          => 'Projetos',
			'singular_name' => 'Projeto',
			'add_new_item'  => 'Novo Projeto',
			'edit_item'     => 'Editar Projeto',
		],
		'public'        => true,
		'show_in_rest'  => true,
		'rest_base'     => 'projeto',
		'supports'      => [ 'title', 'editor', 'thumbnail' ],
		'menu_icon'     => 'dashicons-heart',
		'has_archive'   => false,
		'rewrite'       => [ 'slug' => 'projeto' ],
	] );

	// --- Depoimentos ---
	register_post_type( 'depoimento', [
		'labels'       => [
			'name'          => 'Depoimentos',
			'singular_name' => 'Depoimento',
			'add_new_item'  => 'Novo Depoimento',
		],
		'public'        => false,
		'show_ui'       => true,
		'show_in_rest'  => true,
		'rest_base'     => 'depoimento',
		'supports'      => [ 'title' ],
		'menu_icon'     => 'dashicons-format-quote',
	] );

	// --- Timeline / Marcos Históricos ---
	register_post_type( 'timeline_event', [
		'labels'       => [
			'name'          => 'Timeline',
			'singular_name' => 'Marco Histórico',
			'add_new_item'  => 'Novo Marco',
		],
		'public'        => false,
		'show_ui'       => true,
		'show_in_rest'  => true,
		'rest_base'     => 'timeline_event',
		'supports'      => [ 'title' ],
		'menu_icon'     => 'dashicons-calendar-alt',
	] );

	// --- Relatórios de Transparência ---
	register_post_type( 'relatorio', [
		'labels'       => [
			'name'          => 'Relatórios',
			'singular_name' => 'Relatório',
			'add_new_item'  => 'Novo Relatório',
		],
		'public'        => false,
		'show_ui'       => true,
		'show_in_rest'  => true,
		'rest_base'     => 'relatorio',
		'supports'      => [ 'title' ],
		'menu_icon'     => 'dashicons-media-document',
	] );
} );

// =========================================================
// 3. Expor campos ACF no REST API
// =========================================================
// ACF >= 5.11 faz isso automaticamente.
// Se os campos "acf" não aparecerem na resposta, habilite aqui:
add_filter( 'acf/settings/rest_api_format', function() {
	return 'standard';
} );

// =========================================================
// FIM — salve o arquivo e acesse Configurações > Links
// Permanentes no WP admin e clique em "Salvar alterações"
// para recarregar as regras de rewrite dos CPTs.
// =========================================================
