<template>
  <div>
    <div style="display: flex;justify-content: space-between;">

      <div>
        <el-input placeholder="search plans by employee name" size="small"
                  prefix-icon="el-icon-search" style="width: 350px;margin-right: 10px"
                  v-model="keyword" @keydown.enter.native="doSearch" clearable></el-input>
        <el-button icon="el-icon-search" type="primary" size="small" @click="doSearch" clearable>search</el-button>
        <el-button icon="el-icon-plus" type="primary" size="small" @click="showAdd">create a plan</el-button>
      </div>

      <div>
        <el-select v-model="status" placeholder="please select status" size="small">
          <el-option
              v-for="item in options"

              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="doSearch" type="primary" style="margin-left: 10px" icon="el-icon-check"
                   size="small" >OK</el-button>
      </div>


    </div>
    <div style="margin-top: 10px">
      <el-table
          :data="plans"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="empName"
            fixed
            align="left"
            label="employee name"
            width="140">
        </el-table-column>
        <el-table-column
            prop="empNum"
            label="employee number"
            align="left"
            width="140">
        </el-table-column>

        <el-table-column
            prop="id"
            label="training plan id"
            align="center"
            width="140">
        </el-table-column>

        <el-table-column
            prop="content"
            label="content"
            align="center"
            width="305">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="create time"
            align="left"
            width="140">
        </el-table-column>
        <el-table-column
            prop="startTime"
            label="start time"
            align="left"
            width="140">
        </el-table-column>
        <el-table-column
            prop="endTime"
            label="end Time"
            align="left"
            width="140">
        </el-table-column>
        <el-table-column
            prop="provider"
            label="provider"
            align="left"
            width="160">
        </el-table-column>
        <el-table-column
            prop="cost"
            label="cost"
            align="left"
            width="90">
        </el-table-column>
        <el-table-column
            prop="evaluation"
            label="evaluation"
            align="left"
            width="90">
        </el-table-column>
        <el-table-column
            prop="status"
            label="status"
            align="left"
            width="120">
        </el-table-column>
        <el-table-column
            prop="postscript"
            label="postscript"
            align="left"
            width="140">
        </el-table-column>
        <el-table-column
            fixed="right"
            width="140"
            label="operations">
          <template slot-scope="scope">

            <el-button size="small" type="primary" style="margin-left: 30px" @click="doEdit(scope.row)">
              edit
            </el-button>


          </template>
        </el-table-column>

      </el-table>
      <div style="display: flex;justify-content: flex-start">
        <el-pagination
            @current-change="currentChange"
            background
            page-size="6"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
        title="Edit the training plan"
        :visible.sync="dialogVisible1"
        width="95%">
      <div>

        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label="employee name:" prop="empName">
                <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="planEdit.empName" placeholder="input name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="employee number:" prop="empNum">
                <el-input style="width: 150px" size="mini" disabled=""
                          prefix-icon="el-icon-edit" v-model="planEdit.empNum" placeholder="input name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item label="content:" prop="content">
                <el-input style="width: 550px" size="mini" prefix-icon="el-icon-edit" v-model="planEdit.content" placeholder="input name"></el-input>

              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="6" >
              <el-form-item label="create time:" prop="createTime">
                <el-date-picker
                    size="mini"
                    v-model="planEdit.createTime"
                    disabled=""
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 180px"
                    placeholder="create time">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="cost:" prop="cost">
                <el-input style="width: 113px" size="mini" prefix-icon="el-icon-edit"

                          v-model="planEdit.cost" placeholder="input job number"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="padding-left: 0px">
              <el-form-item label="provider" prop="provider">
                <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="planEdit.provider" placeholder="input age"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="padding-left: 54px">
              <el-form-item label="status:" prop="status">
                <el-select v-model="planEdit.status" placeholder="select status" size="mini">
                  <el-option
                      v-for="item in selectOpt"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>

            <el-col :span="6">
              <el-form-item label="evaluation" prop="evaluation">
                <el-input style="width: 192px" size="mini" prefix-icon="el-icon-edit" v-model="planEdit.evaluation" placeholder="input evaluation"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="padding-left: 0px">
              <el-form-item label="postscript:" prop="postscript">
                <el-input style="width: 200px" size="mini" prefix-icon="el-icon-edit" v-model="planEdit.postscript" placeholder="input postscript"></el-input>
              </el-form-item>
            </el-col>



            <el-col :span="6" >
              <el-form-item label="start time:" prop="startTime">
                <el-date-picker
                    size="mini"
                    v-model="planEdit.startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 137px"
                    placeholder="start time">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="end time:" prop="endTime" style="padding-left: 54px">
                <el-date-picker
                    size="mini"
                    v-model="planEdit.endTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 158px"
                    placeholder="end time">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>



        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeEdit">cancel</el-button>
    <el-button type="primary" @click="doEdit2">OK</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="create a training plan (the first three items are required)"
        :visible.sync="dialogVisible2"
        width="95%">
      <div>

        <el-form>
          <el-row>
            <el-col :span="6">
              <el-form-item label="employee name:" prop="empName">
                <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="planAdd.empName" placeholder="input name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="employee number:" prop="empNum">
                <el-input style="width: 150px" size="mini"
                          prefix-icon="el-icon-edit" v-model="planAdd.empNum" placeholder="input job number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item label="content:" prop="content">
                <el-input style="width: 550px" size="mini" prefix-icon="el-icon-edit" v-model="planAdd.content" placeholder="input content"></el-input>

              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="6" >
              <el-form-item label="create time:" prop="createTime">
                <el-date-picker
                    size="mini"
                    v-model="planAdd.createTime"
                    disabled=""
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 180px"
                    placeholder="create time">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="cost:" prop="cost">
                <el-input style="width: 113px" size="mini" prefix-icon="el-icon-edit"

                          v-model="planAdd.cost" placeholder="input cost"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="padding-left: 0px">
              <el-form-item label="provider" prop="provider">
                <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="planAdd.provider" placeholder="input age"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="padding-left: 54px">
              <el-form-item label="status:" prop="status">
                <el-select v-model="planAdd.status" placeholder="select status" size="mini" disabled="">
                  <el-option
                      v-for="item in selectOpt"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>

            <el-col :span="6">
              <el-form-item label="evaluation" prop="evaluation">
                <el-input style="width: 192px" size="mini" prefix-icon="el-icon-edit" v-model="planAdd.evaluation" placeholder="input evaluation"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="padding-left: 0px">
              <el-form-item label="postscript:" prop="postscript">
                <el-input style="width: 200px" size="mini" prefix-icon="el-icon-edit" v-model="planAdd.postscript" placeholder="input postscript"></el-input>
              </el-form-item>
            </el-col>



            <el-col :span="6" >
              <el-form-item label="start time:" prop="startTime">
                <el-date-picker
                    size="mini"
                    v-model="planAdd.startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 137px"
                    placeholder="start time">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="end time:" prop="endTime" style="padding-left: 54px">
                <el-date-picker
                    size="mini"
                    v-model="planAdd.endTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 158px"
                    placeholder="end time">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>



        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeAdd">cancel</el-button>
    <el-button type="primary" @click="doAdd">OK</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "application",
  mounted() {
    this.initPlan()
  },
  data() {
    return {

      selectOpt:[
        {
          value:'in progress',
          label:'in progress'
        },
        {
          value:'finished',
          label:'finished'
        }
      ],
      planAdd:{

        empName:'',
        empNum:'',
        content:'',
        startTime:'',
        endTime:'',
        createTime:'',
        provider:'',
        cost:'',
        evaluation:'',
        status:'',
        postscript:''
      },
      planEdit:{
        id:'',
        empName:'',
        empNum:'',
        content:'',
        startTime:'',
        endTime:'',
        createTime:'',
        provider:'',
        cost:'',
        evaluation:'',
        status:'',
        postscript:''
      },
      dialogVisible1:false,
      dialogVisible2:false,
      page: 1,
      size: 6,
      total: 0,
      status: '',
      keyword: '',
      plans: [],
      options: [{
        value: 'in progress',
        label: 'in progress'
      }, {
        value: 'finished',
        label: 'finished'
      }, {
        value: 'all',
        label: 'all'
      }],
      value: ''
    }
  },
  methods: {
    clearEdit(){
      this.planEdit.empName='',
      this.planEdit.empNum='',
      this.planEdit.content='',
      this.planEdit.startTime='',
      this.planEdit.endTime='',
      this.planEdit.createTime='',
      this.planEdit.provider='',
      this.planEdit.cost='',
      this.planEdit.evaluation='',
      this.planEdit.status='',
      this.planEdit.postscript=''
    },
    clearAll(){
      this.planAdd.empName='',
      this.planAdd.empNum='',
      this.planAdd.content='',
      this.planAdd.startTime='',
      this.planAdd.endTime='',
      this.planAdd.createTime='',
      this.planAdd.provider='',
      this.planAdd.cost='',
      this.planAdd.evaluation='',
      this.planAdd.status='',
      this.planAdd.postscript=''
    },
    doAdd(){
      if(this.planAdd.empName==''||this.planAdd.empNum==''||this.planAdd.content==''){
        this.$message.error('Please enter all the required information')
        return false;
      }
      this.dialogVisible2=false
      this.postRequest("/training/basic/plan",this.planAdd).then(resp=>{
        if(resp){
          this.initPlan()
          this.clearAll()
        }
      })
    },
    closeAdd() {
      this.dialogVisible2=false

    },
    getCurrentDate(n) {
      let dd = new Date();
      if (n) {
        dd.setDate(dd.getDate() - n);
      }
      let year = dd.getFullYear();
      let month =
          dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      let day = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return year + "-" + month + "-" + day;
    },
    showAdd(){
      this.dialogVisible2=true
      this.planAdd.createTime=this.getCurrentDate()
      this.planAdd.status='in progress'
    },
    closeEdit() {
      this.dialogVisible1=false
      this.initPlan()
    },
    doEdit2(){
      this.dialogVisible1=false
      this.putRequest("/training/basic/plan",this.planEdit).then(resp=>{
        if(resp){
          this.initPlan()
        }
      })
    },
    doSearch(){
      this.page=1
      this.initPlan()
    },
    doEdit(data){
      this.planEdit=data
      this.dialogVisible1=true;
    },
    currentChange(current) {
      this.page = current
      this.initPlan()
    },
    initPlan() {
      this.getRequest("/training/basic/plan?page=" + this.page + "&size=" + this.size + "&keyword=" + this.keyword + "&status=" + this.status)
          .then(resp => {
            if (resp) {
              this.total = resp.total
              this.plans = resp.data
            }
          })
    }
  }
}
</script>

<style scoped>

</style>