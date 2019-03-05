<template>
  <section>
    <el-form class="toolbar" :inline="true">
      <el-form-item label="검색">
          <el-row :gutter="5">
            <el-col :span="6">
              <el-select v-model="noticeOption" placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          <el-col :span="14">
            <!-- <el-input v-model="search" @keyup.native="onAutoComplete" placeholder="검색어를 입력하세요"></el-input> -->
            <el-input v-model="search" @keyup.enter.native="onList" placeholder="검색어를 입력하세요"></el-input>
          </el-col>
            <!-- <span v-for="(item, index) in autoSearch" :key="index">{{item.subj}}</span> -->
          <el-col :span="4">
            <el-button type="primary" @click="onList">검색</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    
    <el-table :data="noticeData">
      <el-table-column prop="noticeMngNo" label="No" width="70" align="center"></el-table-column>
      <el-table-column prop="subj" label="제목" header-align="center">
        <template slot-scope="scope">
          <span class="link" @click="onDetail(scope.row.noticeMngNo)">{{scope.row.subj}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="noticeTp" align="center" label="구분" width="150">
      </el-table-column>
      <el-table-column prop="regDt" align="center" label="등록일" width="220">
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" 
      :page-size="pageSize" 
      :total="total"
      :current-page.sync="currentPage" 
      @current-change="onPageChange"> 
    </el-pagination>
    
    <div class="bottomBtns">
      <el-button @click="$router.push('/notice/register')" type="primary">공지사항 등록</el-button>
    </div>
  </section>
</template>

<script>
  // import axios from 'axios'
  import { noticeList, autoComplete } from '@/api/app.js'
  import camelCase from 'camelcase-keys'
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
        noticeData: [],
        total: 1,
        pageSize: 10,
        currentPage: 1,
        options: [{
          value: '10',
          label: '전체'
        }, {
          value: '20',
          label: '제목'
        }, {
          value: '30',
          label: '내용'
        }],
        noticeOption: '10',
        search: ''
        // autoSearch: []
      }
    },
    methods: {
      onAutoComplete() {
        autoComplete({search:this.search})
          .then(res => {
            console.log('==== res ====')
            console.log(res);
            console.log('==== res ====')

            this.autoSearch = res.data.body
            console.log(this.autoSearch);
          })
          .catch(err => {

          })
          .finally(_ => {

          })
      },

      onList() {
        console.log(this.search)
        // axios.get('http://localhost:3000/notice/list')
      // noticeList()
      noticeList({search:this.search})
        .then(res => {
          console.log('res = ', res.data.body)
          const data = camelCase(res.data.body)
          console.log('res = ', data)
          // this.noticeData = data

          // console.log('data.length = ', data.length)
          this.total = data.length

          let currentMaxLow = this.currentPage * this.pageSize
          let currentMinLow = currentMaxLow - this.pageSize
          
          console.log(currentMaxLow, currentMinLow);
          
          this.noticeData = data.slice(currentMinLow, currentMaxLow)
          
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
      },
      onDetail(no) {
        console.log('no = ', no)
        this.$router.push({
          path: '/notice/detail',
          query: {no:no}
        })
      },
      onPageChange(pageNo) {
        console.log(pageNo);
        this.currentPage = pageNo
        this.onList()
        
      }
    },
    mounted() {
      this.onList()
    },
    beforeRouteEnter (to, from, next) {
      console.log('======    to     ======')
      console.log(to)
      console.log('======    to     ======')

      console.log('======    from     ======')
      console.log(from)
      console.log('======    from     ======')
      if (Cookies.get('token')) {

        if (to.path === '/login') {
          next({ path: `/` })
        } else {
          next()
        }

      } else {
        if (to.path !== '/login') {
          // next({path:'/login'})
          next({path:`/login?redirect=${to.path}`})
        } else {
          next()
        }
      }
    }
  }
</script>
