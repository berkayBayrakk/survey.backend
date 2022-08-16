/**
 * Controls date format. Expected format is yyyy-mm-dd
 * @param {*} date 
 * @returns 
 */
const dateFormatController=(date)=>{
    const date_regex=/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return date_regex.test(date);
}
module.exports=dateFormatController;