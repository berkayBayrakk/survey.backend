
/**
 * Checks that ıd is exist 
 * @param {*} department_id 
 * @returns 
 */
 function departmentIdValidator(department_id,departments){
    return (departments.find(dep=>dep.id===(parseInt(department_id))))?true:false
}

module.exports=departmentIdValidator;