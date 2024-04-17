import Controller from '@ember/controller';

export default Controller.extend({
  modelName: 'ember-flexberry-dummy-application-user',

  projectionName: 'ApplicationUserL',

  actions: {
    lastReached() {
      let n = this.model.lastUser;
      let res = [];
      for (let i = n; i < n + 10; i++) {
        res.push(this.store.createRecord(this.get('modelName'), { name: i}));
      }

      this.model.lastUser = n + 10;
      this.model.users.addObjects(res);
    }
  }
});
