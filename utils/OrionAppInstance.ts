import type { OrionAppService } from './Orion';

export let orionAppInstance: OrionAppService;

export function setOrionAppInstance (service: OrionAppService) {
	orionAppInstance = service;
}
