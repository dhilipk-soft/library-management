import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCreate } from '../../pages/form-create/form-create';
import { FormCanvas } from '../../pages/form-create/form-canvas/form-canvas';
import { FormElementMenu } from '../../pages/form-create/form-element-menu/form-element-menu';
import { FormSetting } from '../../pages/form-create/form-setting/form-setting';



@NgModule({
  declarations: [
    FormCreate,
    FormCanvas,
    FormElementMenu,
    FormSetting
  ],
  imports: [CommonModule],
  bootstrap: [FormCreate]
})
export class FormModuleModule {}
