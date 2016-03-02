import root from '../app';
import * as Pages from './page';

export default class Router {
    static gotoPage(page, data) {
        let router = {
            ...page,
            component: page.component,
            params: {
                ...page.params,
                ...data
            }
        };
        root.getInstance().push(router);
    }

    static pop(num = 1) {
        root.getInstance().pop(num);
    }

    static popToRoot() {
        root.getInstance().popToRoot();
    }

    static replace(page, data) {
        let router = {
            ...page,
            component: page.component,
            params: {
                ...page.params,
                ...data
            }
        };
        root.getInstance().replace(router);
    }

    static pages = Pages;
}
