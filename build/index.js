!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.serverSideRender}()},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(1),l=n.n(r),c=(n(3),wp.blocks.registerBlockType),u=wp.i18n.__,a=wp.blockEditor.InspectorControls,i=wp.components,s=i.PanelBody,b=i.PanelRow,g=i.TextControl,f=wp.data.useSelect,p=wp.element.Fragment;c("related-taxonomy/related-taxonomies",{title:u("Related Taxonomies","custom-gutenberg-blocks"),icon:"tag",category:"rt-cgb",attributes:{tags:{type:"json"},block_title:{type:"string",default:u("Related Taxonomies","custom-gutenberg-blocks")},selectedTags:{type:"string",default:""}},edit:function(e){var t=e.attributes.tags,n=e.setAttributes,r=f((function(e){return e("core/editor").getCurrentPostId()}));fetch("/wp-json/wp/v2/tags?post="+r).then((function(e){return e.json()})).then((function(e){n({tags:e})}));return Object(o.createElement)(p,null,Object(o.createElement)(a,null,Object(o.createElement)(s,{title:u("Related Tags Block Settings","custom-gutenberg-blocks"),initialOpen:!0},Object(o.createElement)(b,null,Object(o.createElement)(g,{label:u("Block Title","custom-gutenberg-blocks"),value:e.attributes.block_title,onChange:function(e){return n({block_title:e})}}))),Object(o.createElement)(s,{title:u("Select Tags","custom-gutenberg-blocks"),initialOpen:!1},Object(o.createElement)(b,null,Object(o.createElement)(g,{label:u("Tags","custom-gutenberg-blocks"),value:e.attributes.selectedTags,onChange:function(e){n({selectedTags:e})},help:u("Separate the tags with comma.","custom-gutenberg-blocks")})))),Object(o.createElement)(l.a,{block:"related-taxonomy/related-taxonomies",attributes:{tags:t}}))},save:function(){return null}})},function(e,t){!function(){e.exports=this.wp.hooks}()}]);