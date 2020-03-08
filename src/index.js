/**
 * Source entry javascript file: src/index.js
 */
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl } = wp.components;
const { useSelect } = wp.data;
const { Fragment } = wp.element;
import ServerSideRender from '@wordpress/server-side-render';
import { createHooks } from '@wordpress/hooks';

registerBlockType( 'related-taxonomy/related-taxonomies', {
	title: __( 'Related Taxonomies', 'custom-gutenberg-blocks' ),
	icon: 'tag',
	category: 'rt-cgb',
	attributes: {
		tags: {
			type: 'json',
		},
		block_title: {
			type: 'string',
			default: __( 'Related Taxonomies', 'custom-gutenberg-blocks' ),
		},
		selectedTags: {
			type: 'string',
			default: '',
		},
	},
	edit: ( props ) => {
		const {
			attributes: { tags },
			setAttributes,
		} = props;

		const postID = useSelect( ( select ) =>
			select( 'core/editor' ).getCurrentPostId()
		);
		const apiUrl = '/wp-json/wp/v2/tags?post=' + postID;
		fetch( apiUrl )
			.then( ( response ) => {
				return response.json();
			} )
			.then( ( json ) => {
				setAttributes( { tags: json } );
			} );

		const changeSelectedTags = ( newValue ) => {
			setAttributes( { selectedTags: newValue } );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __(
							'Related Tags Block Settings',
							'custom-gutenberg-blocks'
						) }
						initialOpen={ true }
					>
						<PanelRow>
							<TextControl
								label={ __(
									'Block Title',
									'custom-gutenberg-blocks'
								) }
								value={ props.attributes.block_title }
								onChange={ ( value ) =>
									setAttributes( { block_title: value } )
								}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody
						title={ __( 'Select Tags', 'custom-gutenberg-blocks' ) }
						initialOpen={ false }
					>
						<PanelRow>
							<TextControl
								label={ __(
									'Tags',
									'custom-gutenberg-blocks'
								) }
								value={ props.attributes.selectedTags }
								onChange={ changeSelectedTags }
								help={ __(
									'Separate the tags with comma.',
									'custom-gutenberg-blocks'
								) }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<ServerSideRender
					block="related-taxonomy/related-taxonomies"
					attributes={ {
						tags,
					} }
				/>
			</Fragment>
		);
	},
	save: () => {
		// Rendering in PHP
		return null;
	},
} );
