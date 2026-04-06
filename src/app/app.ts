import { Component, signal, OnInit } from '@angular/core';
import {
  GridModule, PageSettingsModel, PageService, SortService, FilterService,
  FilterSettingsModel, GroupService
} from '@syncfusion/ej2-angular-grids';
import { EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { columnDataType, data } from './datasource';
import { EditSettingsModel, ToolbarItems, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs'

@Component({
  selector: 'app-root',
  imports: [GridModule, MaskedTextBoxModule],
  providers: [PageService, FilterService, SortService, GroupService, EditService, ToolbarService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('my-angular-app');
  public data?: object[];
  public orderData?: object | any;
  public pageSettings?: PageSettingsModel;
  public filterOptions?: FilterSettingsModel;
  public editSettings?: EditSettingsModel;
  public customerIDRules?: object;
  public toolbar?: ToolbarItems[];
  ngOnInit(): void {
    this.data = data;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel' ];
    this.customerIDRules = { required: true, minLength: 3};
    this.pageSettings = { pageSize: 5 }
    this.filterOptions = {
      type: 'CheckBox'
    };
  }
  actionBegin(args: SaveEventArgs) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.orderData = Object.assign({}, args.rowData);
    }
    if (args.requestType === 'save') {
      (args.data as columnDataType)['CustomerNumber'] = this.orderData['CustomerNumber'];
    }
  }
}
