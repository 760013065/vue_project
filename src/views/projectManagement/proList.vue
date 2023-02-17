<template>
  <div>
    <div style="display: flex;justify-content: space-between;">
      <div style="margin-top: -15px">
        <h4>The projects are as follows:</h4>
      </div>

      <div>
        <el-button size="small" type="primary" style="margin-right: 0px" @click="showRank">Performance ranking</el-button>
        <el-button size="small" type="primary" style="margin-right: 10px" @click="showAdd">
          create a project
        </el-button>
        <el-select v-model="status" placeholder="please select status" size="small">
          <el-option
              v-for="item in options"

              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="initPro" type="primary" style="margin-left: 10px" icon="el-icon-check"
                   size="small" >OK</el-button>
      </div>
    </div>
    <div>
      <el-table
          :data="projects"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="id"
            fixed
            align="center"
            label="project id"
            width="90">
        </el-table-column>
        <el-table-column
            prop="name"
            label="project name"
            align="left"
            width="210">
        </el-table-column>

        <el-table-column
            prop="aim"
            label="aim"
            align="left"
            width="140">
        </el-table-column>
        <el-table-column
            prop="description"
            label="description"
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
            prop="createTime"
            label="create time"
            align="left"
            width="160">
        </el-table-column>

        <el-table-column
            prop="status"
            label="status"
            align="left"
            width="120">
        </el-table-column>

        <el-table-column
            fixed="right"
            width="140"
            label="operations">
          <template slot-scope="scope">



            <el-popover
                placement="right"
                width="600"
                trigger="click">
              <el-table :data="tasks">
                <el-table-column width="150" property="empName" label="employee name"></el-table-column>
                <el-table-column width="150" property="empNum" label="employee number"></el-table-column>
                <el-table-column width="150" property="content" label="task"></el-table-column>
                <el-table-column width="100" property="status" label="status"></el-table-column>
                <el-table-column width="90" property="evaluation" label="evaluation"></el-table-column>
              </el-table>
              <el-button type="success" size="mini" slot="reference"
                          @click="initTask(scope.row)">
                tasks
              </el-button>
            </el-popover>

            <el-button @click="EditPro(scope.row)" type="success"
                       size="mini" style="margin-left: 6px">
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
        title="create a project"
        :visible.sync="dialogVisible"
        width="78%">
        <div>
          <el-descriptions class="margin-top" title="project basic information" :column="3" size="medium" border>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-opportunity"></i>
                name
              </template>
              <el-input size="small" v-model="newPro.name"></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-place"></i>
                aim
              </template>
              <el-input size="small" v-model="newPro.aim"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-house"></i>
                status
              </template>
              <el-input size="small" v-model="newPro.status" disabled=""></el-input>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-timer"></i>
                start time
              </template>
              <el-date-picker
                  size="small"
                  v-model="newPro.startTime"
                  type="date"
                  placeholder="Select date">
              </el-date-picker>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-timer"></i>
                end time
              </template>
              <el-date-picker
                  size="small"
                  v-model="newPro.endTime"
                  type="date"
                  placeholder="Select date">
              </el-date-picker>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-timer"></i>
                create time
              </template>
              <el-date-picker
                  size="small"
                  disabled=""
                  v-model="newPro.createTime"
                  type="date"
                  placeholder="Select date">
              </el-date-picker>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-document"></i>
                description
              </template>
              <el-input size="small" v-model="newPro.description"></el-input>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div style="margin-top: 30px">
          <div class="listTit">
            <h3>tasks</h3>
            <div
                class="el-icon-circle-plus-outline"
                @click="addRow()"
            ></div>
          </div>
          <el-table
              border
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              :data="taskForm"
              style="width: 100%"
          >


            <el-table-column prop="empNum" label="employee number">
              <template slot-scope="scope">
                <el-input
                    style="width: 350px;margin-right: 10px"
                    v-model="scope.row.empNum"
                    autocomplete="off"
                    size="small"
                    placeholder="input employee number"
                ></el-input>
                <el-popover
                    placement="top-start"
                    width="100px"
                    trigger="click"
                    :content="who">
                  <el-button size="small" @click="findEmp(scope.row.empNum)" slot="reference">who?</el-button>
                </el-popover>

              </template>
            </el-table-column>

            <el-table-column prop="content" label="task">
              <template slot-scope="scope">
                <el-input
                    v-model="scope.row.content"
                    autocomplete="off"
                    size="small"
                    placeholder="input task"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="operation" width="120">
              <template slot-scope="scope">
                <el-button
                    @click="handleDeleteRow(scope.row)"
                    type="danger"
                    size="small"
                >delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

      <span slot="footer" class="dialog-footer">

        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;" size="small">forget emp num</el-button>
        <el-button @click="closeAdd" size="small">cancel</el-button>
        <el-button type="primary" @click="doAdd" size="small">OK</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="edit the project"
        :visible.sync="dialogVisible1"
        width="78%">
      <div>
        <el-descriptions class="margin-top" title="project basic information" :column="3" size="medium" border>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-opportunity"></i>
              name
            </template>
            <el-input size="small" v-model="editPro.name"></el-input>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-place"></i>
              aim
            </template>
            <el-input size="small" v-model="editPro.aim"></el-input>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-house"></i>
              status
            </template>
            <el-select v-model="editPro.status" placeholder="select status">
              <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-timer"></i>
              start time
            </template>
            <el-date-picker
                size="small"
                v-model="editPro.startTime"
                type="date"
                placeholder="Select date">
            </el-date-picker>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-timer"></i>
              end time
            </template>
            <el-date-picker
                size="small"
                v-model="editPro.endTime"
                type="date"
                placeholder="Select date">
            </el-date-picker>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-timer"></i>
              create time
            </template>
            <el-date-picker
                size="small"
                disabled=""
                v-model="editPro.createTime"
                type="date"
                placeholder="Select date">
            </el-date-picker>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-document"></i>
              description
            </template>
            <el-input size="small" v-model="editPro.description"></el-input>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div style="margin-top: 30px">
        <div class="listTit">
          <h3>tasks</h3>
          <div
              class="el-icon-circle-plus-outline"
              @click="editAdd()"
          ></div>
        </div>
        <el-table
            border
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            :data="tasks"
            style="width: 100%"
        >


          <el-table-column prop="empNum" label="employee number">
            <template slot-scope="scope">
              <el-input
                  style="width: 120px;margin-right: 10px"
                  v-model="scope.row.empNum"
                  autocomplete="off"
                  size="small"
                  placeholder="input employee number"
              ></el-input>
              <el-popover
                  placement="top-start"
                  width="100px"
                  trigger="click"
                  :content="who">
                <el-button size="small" @click="findEmp(scope.row.empNum)" slot="reference">who?</el-button>
              </el-popover>

            </template>
          </el-table-column>

          <el-table-column prop="content" label="task">
            <template slot-scope="scope">
              <el-input
                  v-model="scope.row.content"
                  autocomplete="off"
                  size="small"
                  placeholder="input task"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="evaluation" label="evaluation">
            <template slot-scope="scope">
              <el-input
                  v-model="scope.row.evaluation"
                  autocomplete="off"
                  size="small"
                  placeholder="input evaluation"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="status">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="select status">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="operation" width="120">
            <template slot-scope="scope">
              <el-button
                  @click="del2(scope.row)"
                  type="danger"
                  size="small"
              >delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">

        <el-button @click="test11" type="primary" style="margin-left: 16px;" size="small">forget emp num</el-button>
        <el-button @click="doClose" size="small">cancel</el-button>
        <el-button type="primary" @click="doOk" size="small">OK</el-button>
  </span>
    </el-dialog>
    <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">

    </el-drawer>
    <el-dialog
        title="performance ranking"
        :visible.sync="dialogVisibleRank"
        width="70%">
      <div style="display: flex;justify-content: space-between;">
        <div>
          <el-input placeholder="input employee's name to search" size="small"
                    prefix-icon="el-icon-search" style="width: 350px;margin-right: 10px"
                    v-model="searchRank" clearable></el-input>
          <el-button icon="el-icon-search" type="primary" size="small" @click="searRank" >search</el-button>
        </div>

      </div>
      <el-table
          :data="rank"
          border

          stripe
          style="width: 100%;margin-top: 10px">
        <el-table-column
            align="center"
            label="ranking"
            width="150">
          <template slot-scope="scope">
            {{ scope.$index + 1}}
          </template>
        </el-table-column>

        <el-table-column
            prop="empName"
            align="center"
            label="employee name"
            width="275">
        </el-table-column>
        <el-table-column
            prop="empNum"
            align="center"
            label="employee number"
            width="275">
        </el-table-column>
        <el-table-column
            prop="evaluation"
            align="center"
            label="average evaluation"
            width="285">
        </el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeRank" size="small">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: "proList",
  mounted() {
    this.getMax()
    this.initPro()
  },
  data(){
    return{
      rank2:[],
      searchRank:'',
      rank:[],
      dialogVisibleRank:false,
      options2:[{
        value:'complete',
        label:'complete'
      },{
        value:'incomplete',
        label:'incomplete'
      }],
      options1:[{
        value:'in progress',
        label:'in progress'
      },{
        value:'finished',
        label:'finished'
      }],
      editTask:[],
      editPro:{},
      dialogVisible1:false,
      maxId:'',
      newPro:{
        id:'',
        name:'',
        aim:'',
        status:'',
        description:'',
        startTime:'',
        endTime:'',
        createTime:'',
        manager:''
      },
      who:'',
      drawer: false,
      taskForm: [{
        key:1,
        proId:'',
        empName:'',
        empNum:'',
        content:'',
        evaluation:'',
        status:''
      }],
      dialogVisible:false,
      status:'',
      page:1,
      size:6,
      total:0,
      tasks:[{

        proId:'',
        empName:'',
        empNum:'',
        content:'',
        evaluation:'',
        status:''
      }],
      projects:[],
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
      data1:''
    }
  },
  methods:{
    searRank(){

      if(typeof this.searchRank==='undefined' || this.searchRank==null || this.searchRank===''){
        this.showRank()
        return;
      }
      for(let i=0;i<this.rank.length;i++){
        if(this.searchRank==this.rank[i].empName){
          this.rank2.push(this.rank[i])
        }
      }
      this.rank=this.rank2
      this.rank2=[]
    },
    closeRank(){
      this.dialogVisibleRank=false
      this.rank2=[]
    },
    showRank(){
      this.getRequest("/pro/basic/rank").then(resp=>{
        if(resp){
          this.rank=resp.data
          this.dialogVisibleRank=true
        }
      })
    },
    test11(){
      alert(this.tasks[0].id)
    },
    doClose(){
      this.data1=''
      this.dialogVisible1=false
      this.initPro()
    },
    doOk(){

      for(let i=0;i<this.tasks.length;i++){
        this.postRequest("/pro/basic/editTask?proId="+this.editPro.id,this.tasks[i])
      }

      this.putRequest("/pro/basic/editPro",this.editPro).then(resp=>{
        if(resp){
          this.dialogVisible1=false
          this.initPro()
        }
      })
    },
    EditPro(data){
      this.data1=data
      this.editPro=data
      this.getRequest("/pro/basic/tasks?proId="+data.id)
          .then(resp=>{
            if(resp){
              this.tasks=resp.data
              this.showEditPro()
            }
          })
      this.showEditPro()

    },
    showEditPro(){
      this.dialogVisible1=true;
    },
    getMax(){
      this.getRequest("/pro/basic/maxId").then(resp=>{
        if(resp){
          this.maxId=resp
        }
      })
    },
    clear(){
      this.newPro.name=''
      this.newPro.aim=''
      this.newPro.status=''
      this.newPro.startTime=''
      this.newPro.endTime=''
      this.newPro.createTime=''
      this.newPro.description=''
      this.newPro.id=''
    },
    findEmp(num){
      if(num.length==0){
        this.$message({
          message:'employee number is null',
          type:'warning'
        })
        return;
      }
      this.getRequest("/pro/basic/who?empNum="+num)
          .then(resp=>{
            if(resp){
              this.who=resp
            }
          })
    },
    editAdd(){
      let member = this.tasks.length + 1;
      this.tasks.push({
        key: member,
        proId:'',
        empName:'',
        empNum:'',
        content:'',
        evaluation:'',
        status:''
      });
    },
    addRow() {

        //设备
        let member = this.taskForm.length + 1;
        this.taskForm.push({
          key: member,
          proId:'',
          empName:'',
          empNum:'',
          content:'',
          evaluation:'',
          status:''
        });

    },
    del2(row){
      this.$confirm('Are you sure to delete this task?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if(this.tasks.length==1){
          this.$message({
            message:'at least 1 item',
            type:'warning'
          })
          return;
        }
        this.deleteRequest("/pro/basic/delTask?id="+row.id).then(resp=>{
          if(resp){
            this.getRequest("/pro/basic/tasks?proId="+this.data1.id)
                .then(resp=>{
                  if(resp){
                    this.tasks=resp.data
                  }
                })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operation cancelled'
        });
      });

    },
    handleDeleteRow(row) {
      if(this.taskForm.length==1){
        this.$message({
          message:'at least 1 item',
          type:'warning'
        })
        return;
      }
      for (let i = 0; i < this.taskForm.length; i++) {
        if (this.taskForm[i].key == row.key) {
          this.taskForm.splice(i, 1);
        }
      }
    },
    showAdd(){
      this.newPro.status='in progress'
      this.newPro.createTime=Date.now()
      this.dialogVisible=true

    },
    closeAdd(){
      this.dialogVisible=false
      this.taskForm.splice(1,this.taskForm.length)
      this.taskForm[0].empNum=''
      this.taskForm[0].content=''
      this.clear()
    },
    doAdd(){
      // this.postRequest("/pro/basic/add?proId=10",this.taskForm[0])
      if(typeof this.newPro.name==='undefined' || this.newPro.name==null || this.newPro.name===''){
        this.$message({
          message:'fill all the blanks',
          type:'warning'
        })
        return;
      }
      if(typeof this.newPro.aim==='undefined' || this.newPro.aim==null || this.newPro.aim===''){
        this.$message({
          message:'fill all the blanks',
          type:'warning'
        })
        return;
      }
      if(typeof this.newPro.description==='undefined' || this.newPro.description==null || this.newPro.description===''){
        this.$message({
          message:'fill all the blanks',
          type:'warning'
        })
        return;
      }
      for(let i=0;i<this.taskForm.length;i++){
        if(typeof this.taskForm[i].content ==='undefined' || this.taskForm[i].content==null || this.taskForm[i].content===''|| typeof this.taskForm[i].empNum ==='undefined' || this.taskForm[i].empNum==null || this.taskForm[i].empNum===''){
          this.$message({
            message:'fill all the blanks',
            type:'warning'
          })
          return;
        }
      }
      this.getMax()

      for(let i=0;i<this.taskForm.length;i++){
          this.postRequest("/pro/basic/add?proId="+this.maxId,this.taskForm[i])
      }

      this.newPro.id=this.maxId
      this.postRequest("/pro/basic/addPro",this.newPro).then(resp=>{
        if(resp){
          this.initPro()
        }
      })
      this.dialogVisible=false
      this.taskForm.splice(1,this.taskForm.length)
      this.taskForm[0].empNum=''
      this.taskForm[0].content=''
      this.clear()

    },
    currentChange(current){
      this.page=current
      this.initPro()
    },
    test(data) {
      alert(data)
    },
    initPro(){
      this.getRequest("/pro/basic/?page="+this.page+"&size="+this.size+"&status="+this.status)
          .then(resp=>{
            if(resp){
              this.total=resp.total
              this.projects=resp.data
              this.getMax()
            }
          })
    },
    initTask(data){
      this.getRequest("/pro/basic/tasks?proId="+data.id)
          .then(resp=>{
            if(resp){
              this.tasks=resp.data
            }
          })
    }
  },

}
</script>

<style scoped>

.listTit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.listTit div {
  font-size: 16px;
  color: #333;
}
.dilogStyle >>> .el-dialog__header {
  border-bottom: 1px solid #ebeef5;
}
.dilogStyle >>> .el-dialog__body {
  padding-top: 10px;
  height: 500px;
  overflow-y: auto;
}
.dilogStyle >>> .el-dialog__footer {
  border-top: 1px solid #ebeef5;
}
</style>