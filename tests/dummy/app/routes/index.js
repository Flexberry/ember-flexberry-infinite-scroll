import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import Builder from 'ember-flexberry-data/query/builder';

export default Route.extend({
  modelName: 'ember-flexberry-dummy-suggestion-type',

  projectionName: 'SuggestionTypeL',

  model() {
    const modelName = this.get('modelName');
    const projectionName = this.get('projectionName');
    const store = this.store;
    const builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .top(20)
      .orderBy('name asc')
      .count();

    return store.query(modelName, builder.build());
  },

  setupController(controller) {
    this._super(...arguments);

    // Define 'modelProjection' for controller instance.
    const modelName = this.get('modelName');
    const modelClass = getOwner(this).resolveRegistration(`model:${modelName}`);
    const projectionName = this.get('projectionName');
    const proj = modelClass.projections.get(projectionName);
    controller.set('modelProjection', proj);
    controller.set('modelName', modelName);
    controller.set('projectionName', projectionName);
  }
});
