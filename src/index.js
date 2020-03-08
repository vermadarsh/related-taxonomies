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

registerBlockType( 'related-taxonomy/related-taxonomies',{
	title: __( 'Related Taxonomies', 'custom-gutenberg-blocks' ),
	icon: 'tag',
	category: 'rt-cgb',
	attributes: {
		tags: {
			type: 'json'
		},
		heading: {
			type: 'string',
			default: __( 'Related Taxonomies', 'custom-gutenberg-blocks' )
		}
	},
	edit: ( props ) => {
		const { attributes: { tags }, setAttributes } = props;

		const postID = useSelect( select =>
			select( 'core/editor' ).getCurrentPostId()
		);
		var apiUrl = '/wp-json/wp/v2/tags?post=' + postID;
		fetch( apiUrl )
			.then( ( response ) => {
				return response.json()
			} )
			.then( ( json ) => {
				setAttributes( { tags: json } )
			} )
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Related Taxonomies', 'custom-gutenberg-blocks' ) } initialOpen={true}>
						<PanelRow>
							<TextControl 
								label={ __( 'Heading', 'custom-gutenberg-blocks' ) }
								value={ props.attributes.heading }
								onChange={ value => setAttributes( { heading: value } ) }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<ServerSideRender 
					block="related-taxonomy/related-taxonomies"
					attributes={ {
						tags: tags
					} }
				/>
			</Fragment>
		)
	},
	save: () => {
		// Rendering in PHP
		return null;
	},
} );