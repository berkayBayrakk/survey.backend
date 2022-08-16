const {getDepartmentsList}=require('../model/Departments');

/**
 * Checks that ıd is exist 
 * @param {*} department_id 
 * @returns 
 */
async function departmentIdValidator(department_id){
    const departments=await getDepartmentsList();
    const list=[...departments];
    const result=list.find(dep=>dep.id===(parseInt(department_id)));
    if(result){
        return true;
    }
    return false;
}

module.exports=departmentIdValidator;