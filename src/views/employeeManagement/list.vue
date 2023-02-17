<template>

<div>
  <div>
    <div style="display: flex;justify-content: space-between;">
      <div>
        <el-input placeholder="input employee's name or job number to search" size="small"
                  prefix-icon="el-icon-search" style="width: 350px;margin-right: 10px"
                  v-model="keyword" @keydown.enter.native="initEmps" clearable></el-input>
        <el-button icon="el-icon-search" type="primary" size="small" @click="initEmps" >search</el-button>
        <el-button type="primary" :icon="showAdvance?'el-icon-arrow-up':'el-icon-arrow-down'" size="small" @click="showAdvance=!showAdvance">
          advanced search</el-button>
      </div>
      <div>
        <el-upload
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            style="display: inline-flex;margin-right: 10px"
            action="/employee/basic/import">
          <el-button type="success" :icon="importIcon" size="small" >{{ importButton }}</el-button>
        </el-upload>

        <el-button type="success" icon="el-icon-sort-down" size="small" @click="exportData">export</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="showAdd">add</el-button>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-show="showAdvance" style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px 0px;
      margin: 10px">
        <el-form>

          <el-form-item label="Interests:" prop="interest" style="padding-left: 350px">
            <el-input style="width: 303px" size="mini"
                      prefix-icon="el-icon-edit" v-model="content.interest"
                      placeholder="input interests,separated by /"></el-input>
          </el-form-item>
          <el-form-item label="Skills:" prop="skill" style="padding-left: 350px">
            <el-input style="width: 325px" size="mini"
                      prefix-icon="el-icon-edit" v-model="content.skill"
                      placeholder="input skills,separated by /"></el-input>
          </el-form-item>
          <el-form-item label="Positions:" prop="experience" style="padding-left: 350px">
            <el-input style="width: 300px" size="mini"
                      prefix-icon="el-icon-edit" v-model="content.experience"
                      placeholder="input positions,separated by /"></el-input>
          </el-form-item>
          <el-button type="primary" @click="doAdvancedSearch" size="mini" style="margin-left: 500px" >search</el-button>
        </el-form>
      </div>
    </transition>

  </div>
  <div style="margin-top: 10px">
    <el-table
        :data="emps"
        border
        stripe
        style="width: 100%">
      <el-table-column
          prop="name"
          fixed
          align="left"
          label="name"
          width="90">
      </el-table-column>
      <el-table-column
          prop="jobNumber"
          label="job number"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="gender"
          label="gender"
          align="left"
          width="90">
      </el-table-column>
      <el-table-column
          prop="birthday"
          label="date of birth"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="age"
          label="age"
          align="left"
          width="90">
      </el-table-column>
      <el-table-column
          prop="idCard"
          label="ID number"
          align="left"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="address"
          align="left"
          width="90">
      </el-table-column>
      <el-table-column
          prop="nation"
          label="nation"
          align="left"
          width="90">
      </el-table-column>
      <el-table-column
          prop="email"
          label="email"
          align="left"
          width="180">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="phone number"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="department"
          label="department"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="position"
          label="position"
          align="left"
          width="90">
      </el-table-column>
      <el-table-column
          fixed="right"
          width="220"
          label="operations">
        <template slot-scope="scope">
          <el-button @click="showEdit(scope.row)" size="mini" style="padding: 3px">
            edit
          </el-button>
          <el-button type="primary" size="mini" style="padding: 3px" @click="viewAdvancedInfo(scope.row)">
            view advanced info
          </el-button>
          <el-button @click="delEmp(scope.row)" type="danger" size="mini" style="padding: 3px">
            delete
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="display: flex;justify-content: flex-start">
      <el-pagination
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
  </div>

  <el-dialog
      title="Please fill in the basic information of the employee"
      :visible.sync="dialogVisible"
      width="95%">
<!--    <div>-->
<!--      <el-form>-->
<!--        <el-row>-->
<!--          <el-col :span="6">-->
<!--            <el-form-item label="name:" prop="name">-->
<!--              <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="emp.name" placeholder="input name"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6">-->
<!--            <el-form-item label="gender:" prop="gender">-->
<!--              <el-radio-group v-model="emp.gender" style="margin-top: 14px">-->
<!--                <el-radio label="male">male</el-radio>-->
<!--                <el-radio label="female">female</el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6" >-->
<!--            <el-form-item label="date of birth:" prop="birthday">-->
<!--              <el-date-picker-->
<!--                  size="mini"-->
<!--                  v-model="emp.birthday"-->
<!--                  type="date"-->
<!--                  value-format="yyyy-MM-dd"-->
<!--                  style="width: 150px"-->
<!--                  placeholder="date of birth">-->
<!--              </el-date-picker>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6" style="padding-left: 35px">-->
<!--            <el-form-item label="age" prop="age">-->
<!--              <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="emp.age" placeholder="input age"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="6">-->
<!--            <el-form-item label="job number:" prop="jobNumber">-->
<!--              <el-input style="width: 113px" size="mini" prefix-icon="el-icon-edit"-->
<!--                        disabled=""-->
<!--                        v-model="emp.jobNumber" placeholder="input job number"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6">-->
<!--            <el-form-item label="idCard:" prop="idCard">-->
<!--              <el-input style="width: 168px" size="mini" prefix-icon="el-icon-edit" v-model="emp.idCard" placeholder="input idCard"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6">-->
<!--            <el-form-item label="address:" prop="address">-->
<!--              <el-input style="width: 180px" size="mini" prefix-icon="el-icon-edit" v-model="emp.address" placeholder="input address"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6" style="padding-left: 35px">-->
<!--            <el-form-item label="nation:" prop="nation">-->
<!--              <el-input style="width: 130px" size="mini" prefix-icon="el-icon-edit" v-model="emp.nation" placeholder="input nation"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->

<!--          <el-col :span="6">-->
<!--            <el-form-item label="email:" prop="email">-->
<!--              <el-input style="width: 160px" size="mini" prefix-icon="el-icon-edit" v-model="emp.email" placeholder="input email"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6">-->
<!--            <el-form-item label="phone number:" prop="phone">-->
<!--              <el-input style="width: 120px" size="mini" prefix-icon="el-icon-edit" v-model="emp.phone" placeholder="input phone number"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6">-->
<!--            <el-form-item label="position:" prop="position">-->
<!--              <el-input style="width: 180px" size="mini" prefix-icon="el-icon-edit" v-model="emp.position" placeholder="input position"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="6" style="padding-left: 32px">-->
<!--            <el-form-item label="department:" prop="department">-->
<!--              <el-input style="width: 100px" size="mini" prefix-icon="el-icon-edit" v-model="emp.department" placeholder="input department"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--    </div>-->
    <div>
      <el-descriptions class="margin-top"  :column="4" size="medium" border>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            name
          </template>
          <el-input size="mini" v-model="emp.name" placeholder="input name"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            gender
          </template>
          <el-radio-group v-model="emp.gender" >
            <el-radio label="male">male</el-radio>
            <el-radio label="female">female</el-radio>
          </el-radio-group>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            date of birth
          </template>
          <el-date-picker
              size="mini"
              v-model="emp.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="date of birth">
          </el-date-picker>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            age
          </template>
          <el-input  size="mini"  v-model="emp.age" placeholder="input age"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            job number
          </template>
          <el-input  size="mini"
                    disabled=""
                    v-model="emp.jobNumber" placeholder="input job number"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            idCard
          </template>
          <el-input size="mini"  v-model="emp.idCard" placeholder="input idCard"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            address
          </template>
          <el-input  size="mini"  v-model="emp.address" placeholder="input address"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            nation
          </template>
          <el-input  size="mini"  v-model="emp.nation" placeholder="input nation"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            email
          </template>
          <el-input size="mini"  v-model="emp.email" placeholder="input email"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            phone number
          </template>
          <el-input  size="mini"  v-model="emp.phone" placeholder="input phone number"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            position
          </template>
          <el-input  size="mini"  v-model="emp.position" placeholder="input position"></el-input>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit"></i>
            department
          </template>
          <el-input  size="mini"  v-model="emp.department" placeholder="input department"></el-input>
        </el-descriptions-item>

      </el-descriptions>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeAdd">cancel</el-button>
    <el-button type="primary" @click="doAdd">OK</el-button>
  </span>
  </el-dialog>

  <el-dialog
      title="Edit the employee"
      :visible.sync="dialogVisibleEdit"
      width="85%">
    <div>

      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="name:" prop="name">
              <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="emp.name" placeholder="input name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="gender:" prop="gender">
              <el-radio-group v-model="emp.gender" style="margin-top: 14px">
                <el-radio label="male">male</el-radio>
                <el-radio label="female">female</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="date of birth:" prop="birthday">
              <el-date-picker
                  size="mini"
                  v-model="emp.birthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 150px"
                  placeholder="date of birth">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 35px">
            <el-form-item label="age" prop="age">
              <el-input style="width: 150px" size="mini" prefix-icon="el-icon-edit" v-model="emp.age" placeholder="input age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="job number:" prop="jobNumber">
              <el-input style="width: 113px" size="mini" prefix-icon="el-icon-edit"
                        disabled=""
                        v-model="emp.jobNumber" placeholder="input job number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="idCard:" prop="idCard">
              <el-input style="width: 168px" size="mini" prefix-icon="el-icon-edit" v-model="emp.idCard" placeholder="input idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="address:" prop="address">
              <el-input style="width: 180px" size="mini" prefix-icon="el-icon-edit" v-model="emp.address" placeholder="input address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 35px">
            <el-form-item label="nation:" prop="nation">
              <el-input style="width: 130px" size="mini" prefix-icon="el-icon-edit" v-model="emp.nation" placeholder="input nation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="6">
            <el-form-item label="email:" prop="email">
              <el-input style="width: 160px" size="mini" prefix-icon="el-icon-edit" v-model="emp.email" placeholder="input email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="phone number:" prop="phone">
              <el-input style="width: 120px" size="mini" prefix-icon="el-icon-edit" v-model="emp.phone" placeholder="input phone number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="position:" prop="position">
              <el-input style="width: 180px" size="mini" prefix-icon="el-icon-edit" v-model="emp.position" placeholder="input position"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 32px">
            <el-form-item label="department:" prop="department">
              <el-input style="width: 100px" size="mini" prefix-icon="el-icon-edit" v-model="emp.department" placeholder="input department"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeEdit">cancel</el-button>
    <el-button type="primary" @click="doEdit">OK</el-button>
  </span>
  </el-dialog>

  <el-dialog
      title="Advanced information"
      :visible.sync="adview"
      width="78%">
    <div>
      <h3 style="text-align: center">Interest</h3>
      <el-table
          :data="inte"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="interest"
            fixed
            align="left"
            label="interest">
        </el-table-column>

        <el-table-column
            prop="description"
            fixed
            align="left"
            label="description">
        </el-table-column>

        <el-table-column
            label="operations" style="margin-top: 20px">
          <template slot-scope="scope">
            <el-button @click="" type="danger" size="small" style="padding: 3px">
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 style="text-align: center">Skill</h3>
      <el-table
          :data="ski"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="skill"
            fixed
            align="left"
            label="skill">
        </el-table-column>

        <el-table-column
            prop="description"
            fixed
            align="left"
            label="description">
        </el-table-column>

        <el-table-column
            label="operations">
          <template slot-scope="scope">
            <el-button @click="" type="danger" size="small" style="padding: 3px">
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 style="text-align: center">Experience</h3>
      <el-table
          :data="exp"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="position"
            fixed
            align="left"
            label="position">
        </el-table-column>

        <el-table-column
            prop="startTime"
            fixed
            align="left"
            label="start time">
        </el-table-column>

        <el-table-column
            prop="endTime"
            fixed
            align="left"
            label="end time">
        </el-table-column>

        <el-table-column
            prop="description"
            fixed
            align="left"
            label="description">
        </el-table-column>

        <el-table-column
            label="operations">
          <template slot-scope="scope">
            <el-button @click="" type="danger" size="small" style="padding: 3px">
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3 style="text-align: center">Education Experience</h3>
      <el-table
          :data="edu"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="degree"
            fixed
            align="left"
            label="degree">
        </el-table-column>

        <el-table-column
            prop="school"
            fixed
            align="left"
            label="school">
        </el-table-column>

        <el-table-column
            prop="major"
            fixed
            align="left"
            label="major">
        </el-table-column>

        <el-table-column
            prop="grades"
            fixed
            align="left"
            label="grades">
        </el-table-column>

        <el-table-column
            prop="startTime"
            fixed
            align="left"
            label="start time">
        </el-table-column>

        <el-table-column
            prop="endTime"
            fixed
            align="left"
            label="end time">
        </el-table-column>

        <el-table-column
            label="operations">
          <template slot-scope="scope">
            <el-button @click="" type="danger" size="small" style="padding: 3px">
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="adview=false">OK</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: "list",
  data(){
    return{
      importButton:'import',
      importIcon:'el-icon-sort-up',
      adview:false,
      exp:[],
      ski:[],
      inte:[],
      edu:[],
      showAdvance:false,
      content:{
        skill:"",
        experience:"",
        interest: ""
      },
      dialogVisibleEdit:false,
      dialogVisible:false,
      emps:[],
      total:0,
      page:1,
      size:10,
      keyword:'',
      emp:{
        name: "",
        gender: "",
        jobNumber: "",
        age: "",
        birthday: "",
        idCard: "",
        address: "",
        nation: "",
        email: "",
        phone: "",
        department: "",
        position: ""
      },
    }
  },
  mounted(){
    this.initEmps()
  },
  methods:{
    sleep(n){
      for(let t=Date.now();Date.now()-t<=n;);
    },
    onError(err,file,fileList){
      this.importButton='import'
      this.importIcon='el-icon-sort-up'
    },
    onSuccess(response,file,fileList){
      this.importButton='import'
      this.importIcon='el-icon-sort-up'
      this.$message.success("upload successfully")
      this.initEmps()
    },
    beforeUpload(){
      this.importButton='uploading...'
      this.importIcon='el-icon-loading'
    },
    exportData(){
      window.open("employee/basic/export",'_parent')
    },
    viewAdvancedInfo(data){
      this.adview=true
      this.getRequest("/employee/basic/viewAd/"+data.jobNumber).then(resp=>{
        if(resp){
          this.exp=resp.exp
          this.ski=resp.ski
          this.inte=resp.inte
          this.edu=resp.edu
        }
      })
    },
    doAdvancedSearch(){
      this.postRequest("/employee/basic/adSearch",this.content).then(resp=>{
        if(resp){

          this.emps=resp.data
          this.total=resp.total
        }
      })
    },
    closeAdd(){
      this.dialogVisible=false
      this.clearAll()
    },
    closeEdit(){
      this.dialogVisibleEdit=false
      this.clearAll()
      this.initEmps()

    },
    doEdit(){
      this.putRequest("/employee/basic/",this.emp).then(resp=>{
        if(resp){
          this.dialogVisibleEdit=false
          this.initEmps()
          this.clearAll()

        }
      })
    },
    showEdit(data){
      this.dialogVisibleEdit=true
      this.emp=data
    },
    delEmp(data){
      this.$confirm('Are you sure to delete this employee?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/employee/basic/"+data.jobNumber).then(resp=>{
          if(resp){
            this.initEmps()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operation cancelled'
        });
      });
    },
    clearAll(){
      this.emp.name=""
      this.emp.age=""
      this.emp.idCard=""
      this.emp.jobNumber=""
      this.emp.phone=""
      this.emp.department=""
      this.emp.address=""
      this.emp.email=""
      this.emp.nation=""
      this.emp.birthday=""
      this.emp.gender=""
      this.emp.position=""
    },
    doAdd(){
      this.postRequest("/employee/basic/",this.emp).then(resp=>{
        if(resp){
          this.dialogVisible=false
          this.initEmps()
          this.clearAll()
        }
      })
    },
    getMaxID(){
      this.getRequest("/employee/basic/maxJobNumber").then(resp=>{
        if(resp){
          this.emp.jobNumber=resp.obj
        }
      })
    },
    showAdd(){
      this.getMaxID()
      this.dialogVisible=true
    },
    currentChange(current){
      this.page=current
      this.initEmps()
    },
    initEmps(){
      this.getRequest("/employee/basic/?page="+this.page+"&size="+this.size+"&keyword="+this.keyword).then(resp=>{
        if(resp){
          this.emps=resp.data
          this.total=resp.total
        }
      })
    },
  }
}
</script>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .8s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}
</style>