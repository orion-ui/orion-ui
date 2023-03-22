---
lang: en-US
title: Prompt service
description:
---

# Promt service

The `usePrompt` service displays a modal with an input field and confirm/cancel buttons.

The field type can be one of the following `Orion.Model.PromptType`


```ts:no-line-numbers
// Type definition
type Orion.Model.PromptType = 
	| "input"
	| "textarea"
	| "password"
	| "select"
	| "phone"
	| "upload"
	| "datepicker"
	;
```  
  \
This service takes `Orion.Modal.Options` as parameters.  
You can also add custom actions buttons by adding the property `actions` to the options object. 

## Usage

```ts:no-line-numbers
await usePrompt({
	title: 'Lorem ipsum',
	size: 'sm',
	prompt: {
		type: 'textarea',
		fieldProps: {
			required: true,
			label: `Your message`,
			maxLength: 1000,
		},
	},
});
```

<service-preview />

::: demo:(service)
PromptExample
:::

