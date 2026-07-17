import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../pages/reactive-enrollment-form/can-deactivate';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate();
};
