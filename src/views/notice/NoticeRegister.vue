<template>
  <section class="detail">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="제목">
        <el-input v-model="form.subj"></el-input>
      </el-form-item>
      <el-form-item label="헤드라인 등록" prop="dpTp">
        <el-radio-group v-model="form.dpTp">
          <el-radio label="헤드라인"></el-radio>
          <el-radio label="일반"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="개시대상" prop="init">
        <el-checkbox-group v-model="form.init">
          <el-checkbox label="PC Web"></el-checkbox>
          <el-checkbox label="Mobile Web"></el-checkbox>
          <el-checkbox label="APP"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="내용" props="conts">
        <vue-editor id="editor" v-model="form.conts"
          @imageAdded="handleImage"
          useCustomImageHandler>
        </vue-editor>
      </el-form-item>

      <el-form-item label="이미지등록">
        <el-upload 
          class="upload-demo"
          action=""
          name="file"
          :multiple="false"
          :on-remove="onImgRemove"
          :on-change="onImgChange"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="info">파일업로드</el-button>
        </el-upload>
      </el-form-item>

    </el-form>
    <div class="bottomBtns">
      <el-button v-if="!modifyYn" @click="onSubmit" type="primary">등록</el-button>
      <el-button v-else @click="onModify" type="primary">수정</el-button>
      <el-button @click="onCancel" type="primary">취소</el-button>
    </div>
  </section>
</template>
<script>
import { VueEditor } from 'vue2-editor'
// import axios from 'axios'
import { noticeRegister, noticeDetail, noticeModify } from '@/api/app'
import camelCase from 'camelcase-keys'
export default {
  components: {
    VueEditor
  },
  
  data() {
    return {
      form: {
        subj: '',
        dpTp: '',
        init: [],
        conts: '',
        oriImgName: '',
        phyImgName: ''
      },
      fileList: [],
      modifyYn: false,
      no: this.$route.query.no,
      imgFile: '',
    }
  },
  methods: {
    onImgRemove(file) {
      console.log('===== onImgRemove =====')
      console.log(file);
      console.log('===== onImgRemove =====')
      this.imgFile = ''
      this.form.oriImgName = ''
    },
    onImgChange(file) {
      console.log('===== onImgChange =====')
      console.log(file);
      console.log('===== onImgChange =====')
      let fileName = file.name

      console.log('fileNmae = ', fileName)
      
      let lastDot = fileName.lastIndexOf('.')

      console.log('lastDot = ', lastDot)

      let fileExt = fileName.substring(lastDot).toLowerCase()

      console.log('fileExt = ', fileExt)

      if (fileExt !== '.jpg' && fileExt !== '.png' && fileExt !== '.jpeg') {
        alert("JPG, PNG파일만 업로드 가능합니다")
        this.fileList = []
      } else {
        this.imgFile = file
      }
    },

    onModify() {
      // axios({
      //   method: 'POST',
      //   url: 'http://localhost:3000/notice/modify',
      //   data: { form: this.form, no: this.no }
      // })

      const formData = new FormData()

      formData.append('form', JSON.stringify(this.form))
      formData.append('no', this.no)

      if (this.imgFile) {
        formData.append('image', this.imgFile.raw)
      }

      noticeModify(formData)
        .then(res => {
          console.log('res = ', res)

          if (res.data.ok) this.$router.push('/notice/list')

        })
        .catch(err => {
          console.log(err);
          alert('에러가 발생하였습니다')
        })
        .finally(() => {

        })
    },

    // 등록
    onSubmit() {
      // axios({
      //   method: 'POST',
      //   url: 'http://localhost:3000/notice/register',
      //   data: { form: this.form }
      // })

      const formData = new FormData()

      // formData.append('form', JSON.stringify(this.form))
      formData.append('form', JSON.stringify(this.form))

      if (this.imgFile) {
        formData.append('image', this.imgFile.raw)
      }
      
      noticeRegister(formData)
        .then(res => {
          console.log('res = ', res)

          if (res.data.ok) this.$router.push('/notice/list')

        })
        .catch(err => {
          console.log(err);
          alert('에러가 발생하였습니다')
        })
        .finally(() => {

        })
    },

    // 취소
    onCancel() {
      this.$confirm("등록을 취소하시겠습니까?", {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        center: true,
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/noticeList')
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: '취소되었습니다'
          })
          console.log(err);
        })
    },
    handleImage(file) {
      let formData = new FormData()

      formData.append('file', file)
      formData.append('form', this.form)

      axios.post('http://localhost:3000/file', {
        formData: formData
      })
    }
  },
  created() {
    
    if (this.no) {

      this.modifyYn = true

      // axios.get(`http://localhost:3000/notice/detail/${this.no}`)
      noticeDetail(this.no)
        .then(res => {
          console.log('res = ', res)

          const data = camelCase(res.data.body)

          console.log('data = ', data)

          this.form.subj = data.subj
          this.form.conts = data.conts
          this.form.dpTp = data.noticeTp
          
          if (data.phyImgName) {
            this.fileList = [{name:data.oriImgName, url: `http://localhost:3000/images/${data.phyImgName}`}]
          }
          
          this.form.phyImgName = data.phyImgName
          this.form.oriImgName = data.oriImgName

          console.log(data.init)

          if (data.init !== "") {

            this.form.init = data.init.split(',')

            console.log(this.form.init)

          } else {

            this.form.init = []

          }

        })
        .catch(err => {

        })
        .finally(_ => {

        })
    }
  }
}
</script>
<style>

</style>
