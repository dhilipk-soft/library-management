import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCreate } from '../../pages/form-create/form-create';
import { FormCanvas } from '../../pages/form-create/form-canvas/form-canvas';
import { FormElementMenu } from '../../pages/form-create/form-element-menu/form-element-menu';
import { FormSetting } from '../../pages/form-create/form-setting/form-setting';
import { FieldButton } from '../../pages/form-create/field-button/field-button';
import { MatIconModule } from '@angular/material/icon';
import { FormEditor } from '../../pages/form-create/form-canvas/form-editor/form-editor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreview } from "../../pages/form-create/form-canvas/form-preview/form-preview";

@NgModule({
  declarations: [FormCreate, FormSetting, FormCanvas,
  FieldButton, FormElementMenu,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormEditor,
    DragDropModule,
    MatButtonToggleModule,
    FormPreview
],
  bootstrap: [FormCreate],
})
export class FormModuleModule {}
