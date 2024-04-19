import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Builder from 'ember-flexberry-data/query/builder';

export default Controller.extend({

  infiniteModel: computed('model', function() {
    return this.get('model').toArray();
  }),

  actions: {
    lastReached() {
      let infiniteModel = this.get('infiniteModel');
      if (this.get('model.meta.count') > infiniteModel.length) {
        const modelName = this.get('modelName');
        const projectionName = this.get('projectionName');
        const store = this.store;
        const builder = new Builder(store)
          .from(modelName)
          .selectByProjection(projectionName)
          .top(15)
          .skip(infiniteModel.length)
          .orderBy('name asc')
          .count();
    
        return store.query(modelName, builder.build()).then((result) => {
          infiniteModel.pushObjects(result.toArray());
        });
      }
    }
  }
});
