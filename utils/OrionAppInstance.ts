import type { OrionAppService } from './Orion';

export let orionAppInstance: OrionAppService | undefined;

export function setOrionAppInstance (service: OrionAppService) {
	orionAppInstance = service;
}
