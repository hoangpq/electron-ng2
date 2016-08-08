import {Injectable} from '@angular/core';
import {URLSearchParams, Jsonp, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WikipediaService {
    constructor(private jsonp:Jsonp) {

    }

    search(term:string) {
        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');
        return this.jsonp
            .get(`http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK`, {search})
            .map((res:Response) => res.json()[1])
            .catch((err:any) => Observable.throw(err));
    }
}