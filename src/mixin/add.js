import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd (templage = null) {
      this.keys.splice(0,this.keys.length);
      this.formMode = 'add'
      this.$emit('dialog-open', {
        mode: 'add'
      })
      this.isDialogShow = true
      if (templage) {
        this.formData = _clonedeep(templage)
        this.addTemplateStorage = _clonedeep(templage)
      } else {
        this.formData = this.addTemplate ? _clonedeep(this.addTemplate) : {}
        this.addTemplateStorage = this.addTemplate ? _clonedeep(this.addTemplate) : {}
      }
      _forEach(this.formData, (value, key) => {
        this.formData[key] = this.addTemplateStorage[key].value
        this.keys.push(key)
      })
      if(this.formGroup){
        let active = []
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
        if(!this.formGroup.active){
          this.formGroup.active = active
        }
      }
    }
  }
}
