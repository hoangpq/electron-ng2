import {Component}  from '@angular/core';
import {WikipediaService} from '../services/wiki.service';
import {Observable} from 'rxjs/Observable';
import {Control, FormBuilder, ControlGroup} from '@angular/common';

@Component({
    selector: 'view-component',
    template: `
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                            <form [ngFormModel]="coolForm">
                                <input #searchInp ngControl="inputTxt" type="text" class="form-control"/>
                            </form>
                        </div>
                        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                            <button class="form-control" (click)="search(searchInp.value)">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row list-view">
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                <ul class="list-group">
                    <li class="list-group-item" *ngFor="let item of items">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .list-view {
            height: 200px;
            overflow-y: scroll;
        }
    `],
    providers: [WikipediaService]
})
export class ViewComponent {

    items:Observable<any>;
    inputTxtField:Control;
    coolForm: ControlGroup;

    constructor(private wikiService:WikipediaService, private fb: FormBuilder) {
        this.inputTxtField = new Control();
        this.coolForm = fb.group({inputTxt: this.inputTxtField});
        this.inputTxtField.valueChanges.debounceTime(400)
            .flatMap(term => this.wikiService.search(term))
            .subscribe(result => this.items = result);
    }

    search(term):void {
        this.items = this.wikiService.search(term);
    }
}