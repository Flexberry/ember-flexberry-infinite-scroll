import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default class SuggestionRoute extends Route {
  model() {
    let res = A();
    for (let i = 0; i < 40; i++) {
      res.addObject(this.store.createRecord('ember-flexberry-dummy-application-user', { name: i }));
    }

    return {
      users: res,
      lastUser: 39
    };
  }
}
