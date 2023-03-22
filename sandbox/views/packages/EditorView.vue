<template>
	<o-page title="Editor">
		<div v-html="rawHtml"/>
		<o-editor
			v-model="rawHtml"
			label="zegfsd"
			:img-max-size="4000"
			required/>

		<hr>

		<div v-html="text"/>
		<o-editor
			v-model="text"
			v-model:json="json"
			label="zegfsd"
			required/>

		<pre>{{ json }}</pre>
	</o-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref<string>();
const json = ref({
	'type': 'doc',
	'content': [
		{
			'type': 'heading',
			'attrs': {
				'textAlign': 'left',
				'level': 2,
			},
			'content': [
				{
					'type': 'text',
					'text': 'Little ',
				},
				{
					'type': 'text',
					'marks': [
						{
							'type': 'textStyle',
							'attrs': {
								'color': '#00FF7F',
								'background': null,
							},
						},
					],
					'text': 'ipddsdfqsdffdddfssum',
				},
			],
		},
		{
			'type': 'paragraph',
			'attrs': { 'textAlign': 'left' },
			'content': [
				{
					'type': 'text',
					'text': 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut ',
				},
				{
					'type': 'text',
					'marks': [
						{ 'type': 'italic' },
					],
					'text': 'fermentum massa justo sit',
				},
				{
					'type': 'text',
					'text': ' amet risus.',
				},
			],
		},
		{
			'type': 'paragraph',
			'attrs': { 'textAlign': 'left' },
			'content': [
				{
					'type': 'text',
					'text': 'Duis mollis, est non commdodo luctus, ',
				},
				{
					'type': 'text',
					'marks': [
						{ 'type': 'bold' },
					],
					'text': 'nisi erat porttitor ligula',
				},
				{
					'type': 'text',
					'text': ',',
				},
				{ 'type': 'hardBreak' },
				{
					'type': 'text',
					'text': 'eget lacinia odio sem nec elit.',
				},
			],
		},
		{
			'type': 'paragraph',
			'attrs': { 'textAlign': 'left' },
			'content': [
				{
					'type': 'text',
					'text': 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
				},
			],
		},
		{
			'type': 'paragraph',
			'attrs': { 'textAlign': 'left' },
			'content': [
				{
					'type': 'text',
					'text': 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ',
				},
				{
					'type': 'text',
					'marks': [
						{
							'type': 'textStyle',
							'attrs': {
								'color': 'rgb(255, 102, 153)',
								'background': '',
							},
						},
					],
					'text': 'ridiculus mus',
				},
				{
					'type': 'text',
					'text': '.',
				},
			],
		},
	],
});

const rawHtml = ref(`
<h2>Little <span style="color: #00FF7F">ipddsdfqsdffdddfssum</span></h2><p>Fusce <span style="color: #FF89CF">dapibus</span>, 
tellus ac cursus commodo, tortor <span style="background: #FC3CAD">mauris condimentum</span> nibh, 
ut <em>fermentum massa justo sit</em> amet risus.</p><p>Duis mollis, 
est non commdodo luctus, <strong>nisi erat porttitor ligula</strong>,<br>eget lacinia odio sem nec elit.</p><p>Integer posuere 
erat a ante venenatis dapibus posuere velit aliquet.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, 
nascetur <span style="color: rgb(255, 102, 153)">ridiculus mus</span>.</p>
`);
</script>
