---
lang: en-US
title: Draggable
---

# OrionDraggable

`<o-draggable>` displays a draggable item. This component must be combined with `<o-droppable>`.

<attribute-table/>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDay = ref(new Date());
const dayTasks = ref([
	{
		id: 0,
		start: new Date(new Date().setHours(8, 0)),
		end: new Date(new Date().setHours(10, 0)),
		title: 'task number 1',
		color: 'info',
	},
	{
		id: 2,
		start: new Date(new Date().setHours(8, 30)),
		end: new Date(new Date().setHours(12, 0)),
		title: 'task number 2',
		color: 'success',
	},
	{
		id: 3,
		start: new Date(new Date().setHours(20, 0)),
		end: new Date(new Date().setHours(23, 0)),
		title: 'task with callback',
		color: 'danger',
		callback: () => { useNotif.success('task callback'); },
	},
]);

</script>
