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

	// --- Causas ---
	register_post_type( 'causa', [
		'labels'       => [
			'name'          => 'Causas',
			'singular_name' => 'Causa',
			'add_new_item'  => 'Nova Causa',
			'edit_item'     => 'Editar Causa',
		],
		'public'        => true,
		'show_in_rest'  => true,
		'rest_base'     => 'causa',
		'supports'      => [ 'title', 'editor', 'thumbnail' ],
		'menu_icon'     => 'dashicons-flag',
		'has_archive'   => false,
		'rewrite'       => [ 'slug' => 'causa' ],
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
// 4. ACF Field Group — Hero Slides (Carrossel)
// =========================================================
// Repeater "hero_slides" adicionado à página ibcm-config.
// Máximo de 3 itens; cada item tem os campos abaixo.
// Endpoint: GET /wp-json/wp/v2/pages?slug=ibcm-config
// O frontend lê opcoes.hero_slides[] do payload acf.
//
// Campos do repeater:
//   - tipo          (select: imagem / youtube / video)
//   - imagem        (image, return_format: array) — usado quando tipo = imagem
//   - youtube_id    (text)   — ID do vídeo do YouTube, ex.: "dQw4w9WgXcQ"
//   - video_url     (file)   — arquivo de vídeo hospedado no WordPress
//   - link          (url)    — link de campanha opcional
//   - link_label    (text)   — rótulo do link, ex.: "Saiba mais sobre a campanha"
//   - ativo         (true_false) — controla exibição no frontend
// =========================================================
add_action( 'acf/init', function () {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group( [
		'key'   => 'group_hero_slides',
		'title' => 'Carrossel do Hero',
		'fields' => [
			[
				'key'          => 'field_hero_slides',
				'label'        => 'Slides do Hero',
				'name'         => 'hero_slides',
				'type'         => 'repeater',
				'max'          => 3,
				'layout'       => 'block',
				'button_label' => 'Adicionar slide',
				'sub_fields'   => [
					[
						'key'     => 'field_hero_slide_tipo',
						'label'   => 'Tipo de mídia',
						'name'    => 'tipo',
						'type'    => 'select',
						'choices' => [
							'imagem'  => 'Imagem',
							'youtube' => 'Vídeo do YouTube',
							'video'   => 'Vídeo do WordPress',
						],
						'default_value' => 'imagem',
					],
					[
						'key'            => 'field_hero_slide_imagem',
						'label'          => 'Imagem de fundo',
						'name'           => 'imagem',
						'type'           => 'image',
						'return_format'  => 'array',
						'preview_size'   => 'medium',
						'instructions'   => 'Recomendado: 1600×900px ou maior. Usado quando Tipo = Imagem.',
						'conditional_logic' => [
							[
								[
									'field'    => 'field_hero_slide_tipo',
									'operator' => '==',
									'value'    => 'imagem',
								],
							],
						],
					],
					[
						'key'          => 'field_hero_slide_youtube_id',
						'label'        => 'ID do vídeo YouTube',
						'name'         => 'youtube_id',
						'type'         => 'text',
						'instructions' => 'Apenas o ID, ex.: dQw4w9WgXcQ (não a URL completa). O vídeo tocará sem som e em loop.',
						'conditional_logic' => [
							[
								[
									'field'    => 'field_hero_slide_tipo',
									'operator' => '==',
									'value'    => 'youtube',
								],
							],
						],
					],
					[
						'key'          => 'field_hero_slide_video_url',
						'label'        => 'Arquivo de vídeo',
						'name'         => 'video_url',
						'type'         => 'file',
						'return_format' => 'url',
						'instructions' => 'Formatos suportados: mp4, webm. Recomendado: mp4 H.264.',
						'conditional_logic' => [
							[
								[
									'field'    => 'field_hero_slide_tipo',
									'operator' => '==',
									'value'    => 'video',
								],
							],
						],
					],
					[
						'key'          => 'field_hero_slide_link',
						'label'        => 'Link de campanha (opcional)',
						'name'         => 'link',
						'type'         => 'url',
						'instructions' => 'Deixe vazio para não exibir nenhum link extra. Use URL relativa (/projetos) ou absoluta.',
					],
					[
						'key'          => 'field_hero_slide_link_label',
						'label'        => 'Rótulo do link',
						'name'         => 'link_label',
						'type'         => 'text',
						'default_value' => 'Saiba mais',
						'instructions' => 'Texto exibido no link de campanha. Ignorado se o link estiver vazio.',
					],
					[
						'key'           => 'field_hero_slide_ativo',
						'label'         => 'Ativo',
						'name'          => 'ativo',
						'type'          => 'true_false',
						'default_value' => 1,
						'ui'            => 1,
					],
				],
			],
		],
		'location' => [
			[
				[
					'param'    => 'page',
					'operator' => '==',
					'value'    => 'ibcm-config', // slug da página de configuração
				],
			],
		],
		'menu_order' => 0,
		'position'   => 'normal',
	] );
} );

// =========================================================
// 5. ACF Field Group — Causas
// =========================================================
// Campos necessários para o CPT "causa" — mesma estrutura de "projeto".
// Crie via ACF > Grupos de campos no WP Admin com as propriedades abaixo,
// ou importe o JSON equivalente ao grupo de Projetos e ajuste o "location".
//
// Localização: Post Type = causa
//
// Campos:
//   - tag             (text)        — ex.: "Saúde", "Acolhimento"
//   - tagcolor        (text)        — ex.: "var(--terra)"
//   - descricaocurta  (textarea)    — resumo para cards
//   - descricaocompleta (textarea)  — texto completo na página
//   - impacto         (textarea)    — números de impacto
//   - bullets         (textarea)    — uma linha por bullet, separados por \n
//   - imagemprincipal (image)       — retorna URL (campo de retorno: URL)
//   - numeros         (text)        — badge ex.: "29 casas · Salvador"
//   - ativo           (true_false)  — controla exibição no frontend
//
// Endpoint REST gerado: GET /wp-json/wp/v2/causa?per_page=100&_embed&status=publish
// =========================================================

add_action( 'acf/init', function () {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group( [
		'key'      => 'group_causa',
		'title'    => 'Campos da Causa',
		'fields'   => [
			[
				'key'   => 'field_causa_tag',
				'label' => 'Tag',
				'name'  => 'tag',
				'type'  => 'text',
			],
			[
				'key'   => 'field_causa_tagcolor',
				'label' => 'Cor da Tag (CSS var)',
				'name'  => 'tagcolor',
				'type'  => 'text',
			],
			[
				'key'   => 'field_causa_descricaocurta',
				'label' => 'Descrição curta',
				'name'  => 'descricaocurta',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'   => 'field_causa_descricaocompleta',
				'label' => 'Descrição completa',
				'name'  => 'descricaocompleta',
				'type'  => 'textarea',
				'rows'  => 5,
			],
			[
				'key'   => 'field_causa_impacto',
				'label' => 'Impacto em números',
				'name'  => 'impacto',
				'type'  => 'textarea',
				'rows'  => 3,
			],
			[
				'key'          => 'field_causa_bullets',
				'label'        => 'Bullets (um por linha)',
				'name'         => 'bullets',
				'type'         => 'textarea',
				'rows'         => 6,
				'instructions' => 'Cada linha vira um item da lista. Não use traços ou marcadores.',
			],
			[
				'key'           => 'field_causa_imagemprincipal',
				'label'         => 'Imagem principal',
				'name'          => 'imagemprincipal',
				'type'          => 'image',
				'return_format' => 'array',
				'preview_size'  => 'medium',
			],
			[
				'key'          => 'field_causa_numeros',
				'label'        => 'Números / Badge',
				'name'         => 'numeros',
				'type'         => 'text',
				'instructions' => 'Ex.: "29 casas · Salvador". Deixe vazio para ocultar o badge.',
			],
			[
				'key'           => 'field_causa_ativo',
				'label'         => 'Ativo (exibir no site)',
				'name'          => 'ativo',
				'type'          => 'true_false',
				'default_value' => 1,
				'ui'            => 1,
			],
		],
		'location' => [
			[
				[
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'causa',
				],
			],
		],
		'menu_order'            => 0,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
	] );
} );

// =========================================================
// FIM — salve o arquivo e acesse Configurações > Links
// Permanentes no WP admin e clique em "Salvar alterações"
// para recarregar as regras de rewrite dos CPTs.
// =========================================================
