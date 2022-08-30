
/**
 * Checks that all of id on parameter is exist on database
 * @param  {} department_ids 
 */
const hasValidDepartmentIds=(department_ids,dep_ids_db)=>{

    if((!Array.isArray(department_ids)) || 
                department_ids.length===0 || 
                department_ids.length>dep_ids_db.length ) return false

    const checkArray=dep_ids_db.map(obj=>
        department_ids.includes(obj.id)
        );
    
    const trueCount=checkArray.reduce((currentTotalTrue,item)=>{
        return (item)?(currentTotalTrue+1):currentTotalTrue;
    },0)

    return (trueCount===department_ids.length);
}
module.exports=hasValidDepartmentIds;