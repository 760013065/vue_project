<template>
  <div>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:''
    };
  },
  methods: {

  },
};
</script>


