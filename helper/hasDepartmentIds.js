const {getDepartmentsList} =require('../model/Departments');

/**
 * Checks that all of id on parameter is exist on database
 * @param  {...any} department_ids 
 */
const hasValidDepartmentIds=async(department_ids)=>{
    try {
        const result = Array.isArray(department_ids);
        if(!result || department_ids.length===0) return result;
        const dep_ids_db=await getDepartmentsList();
        if(department_ids.length>dep_ids_db.length) return false;
        const checkArray=dep_ids_db.map(obj=>(department_ids.includes(obj.id) ));
        let countTrue=0;
        checkArray.forEach(element => {
            if(element){
                countTrue+=1;
            }
        });
        return (countTrue===department_ids.length);
    } catch (error) {
        
    }
}
module.exports=hasValidDepartmentIds;