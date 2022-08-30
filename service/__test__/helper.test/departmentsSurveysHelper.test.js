const {createQueryString}=require('../../../helper/departmentsSurveysHelper');



test('create query string',()=>{
    expect(
        createQueryString([1,2,3],5)
    ).toEqual(`INSERT INTO departments_surveys(department_id,survey_id) VALUES(1,5),(2,5),(3,5)`)
})