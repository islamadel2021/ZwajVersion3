import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { AlertifyService, ConfirmResult } from '../_services/alertify.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<
  MemberEditComponent
> = async (component): Promise<boolean> => {
  const alertify = inject(AlertifyService);

  if (component.editForm?.dirty) {
    const confirm = await alertify.promisifyConfirm(
      'إنتبه',
      'تم تعديل البيانات الخاصة بك هل تود الإستمرار بدون حفظ البيانات',
    );

    if (confirm === ConfirmResult.Ok) {
      alertify.error('لم يتم حفظ البيانات المعدلة');
      return true;
    } else {
      alertify.success('يمكنك حفظ البيانات الآن من خلال نقر زر حفظ التعديلات');
      return false;
    }
  }

  return true;
};
