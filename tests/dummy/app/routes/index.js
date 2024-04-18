import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';

export default Route.extend({
  modelName: 'ember-flexberry-dummy-suggestion-type',

  projectionName: 'SuggestionTypeL',

  model() {
    let res = A();
    for (let i = 0; i < 40; i++) {
      res.addObject(this.store.createRecord('ember-flexberry-dummy-application-user', { name: i }));
    }

    return {
      users: res,
      lastUser: 39
    };
  },

  setupController(controller) {
    this._super(...arguments);

    // Define 'modelProjection' for controller instance.
    const modelName = this.get('modelName');
    const modelClass = getOwner(this).resolveRegistration(`model:${modelName}`);
    const modelProjName = this.get('projectionName');
    const proj = modelClass.projections.get(modelProjName);
    controller.set('modelProjection', proj);
    controller.set('modelName', modelName);
  }
});
