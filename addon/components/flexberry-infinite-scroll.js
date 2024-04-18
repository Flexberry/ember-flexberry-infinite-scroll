import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
//import { getValueFromLocales } from 'ember-flexberry-data/utils/model-functions';
import layout from '../templates/components/flexberry-infinite-scroll';

export default Component.extend({
  layout,

  modelProjection: undefined,

  content: undefined,

  estimateRowHeight: 20,

  visibleRows: 15,

  bufferSize: 1,

  idForFirstItem: undefined,

  height: 400,

  columns: computed('modelProjection', function() {
    const projection = this.get('modelProjection');

    if (!projection) {
      return A();
    }

    return this._generateColumns(projection.attributes);
  }),

  _generateColumns(attributes, columnsBuf, relationshipPath) {
    columnsBuf = columnsBuf || A();
    relationshipPath = relationshipPath || '';

    for (let attrName in attributes) {
      let currentRelationshipPath = relationshipPath;
      if (!attributes.hasOwnProperty(attrName)) {
        continue;
      }

      let attr = attributes[attrName];
      assert(`Unknown kind of projection attribute: ${attr.kind}`, attr.kind === 'attr' || attr.kind === 'belongsTo' || attr.kind === 'hasMany');
      switch (attr.kind) {
        case 'hasMany':
          break;

        case 'belongsTo': {
          if (!attr.options.hidden) {
            const bindingPath = currentRelationshipPath + attrName;
            const column = this._createColumn(attr, attrName, bindingPath);

            columnsBuf.pushObject(column);
          }

          currentRelationshipPath += attrName + '.';
          this._generateColumns(attr.attributes, columnsBuf, currentRelationshipPath);
          break;
        }

        case 'attr': {
          if (attr.options.hidden) {
            break;
          }

          const bindingPath = currentRelationshipPath + attrName;
          const column = this._createColumn(attr, attrName, bindingPath);

          columnsBuf.pushObject(column);
          break;
        }
      }
    }

    return columnsBuf.sortBy('index');
  },

  _createColumn(attr, attrName, bindingPath) {
    //const projection = this.get('modelProjection');
    //const key = `models.${projection.modelName}.projections.${projection.projectionName}.${bindingPath}.__caption__`;
    //const valueFromLocales = getValueFromLocales(this.get('i18n'), key);
    const index = get(attr, 'options.index');

    return {
      name: /*valueFromLocales || */attr.caption/* || capitalize(attrName)*/,
      valuePath: bindingPath,
      index: index
    };
  }
});
