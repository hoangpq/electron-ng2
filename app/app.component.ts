import {Component}              from '@angular/core';
import {ViewComponent}          from './components/view.component';

@Component({
    selector: 'app',
    template: `
        <view-component></view-component>
    `,
    directives: [ViewComponent]
})
export class AppComponent {

}