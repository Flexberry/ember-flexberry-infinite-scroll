import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/flexberry-infinite-scroll';

export default Component.extend({
  layout,

  modelName: undefined,

  projectionName: undefined,

  content: undefined,

  estimateRowHeight: 20,

  bufferSize: 1,

  idForFirstItem: undefined,

  columns: computed('modelName', 'projectionName', function() {
    return [
      {
        name: `Name`,
        valuePath: `name`,
      }
    ];
  }),
});
