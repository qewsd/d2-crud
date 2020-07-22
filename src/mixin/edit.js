import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  data () {
    return {
      /**
       * @description 被编辑行的索引
       */
      editIndex: 0
    }
  },
  methods: {
    /**
     * @description 编辑行数据
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     */
    handleEdit (index, row, templage = null) {
      this.keys.splice(0,this.keys.length);
      this.formMode = 'edit'
      this.editDataStorage = _clonedeep(row)
      this.isDialogShow = true
      this.$emit('dialog-open', {
        mode: 'edit',
        row
      })
      this.editIndex = index
      if (templage) {
        this.formData = _clonedeep(templage)
        this.editTemplateStorage = _clonedeep(templage)
      } else {
        this.formData = this.editTemplate ? _clonedeep(this.editTemplate) : {}
        this.editTemplateStorage = this.editTemplate ? _clonedeep(this.editTemplate) : {}
      }
      _forEach(this.formData, (value, key) => {
        this.formData[key] = row.hasOwnProperty(key) ? row[key] : (this.formData[key] || '')
        this.keys.push(key)
      })
      let active = []
      if(this.formGroup){
        for(let group in this.formGroup.groups) {
          active.push(group)
          for(let index in this.formGroup.groups[group].columns){
            let key = this.formGroup.groups[group].columns[index];
            let index = this.keys.indexOf(key);
            if (index > -1) {
              this.keys.splice(index, 1);
            }
          }
        }
      }
      if(!this.formGroup.active){
        this.formGroup.active = active
      }
    }
  }
}
