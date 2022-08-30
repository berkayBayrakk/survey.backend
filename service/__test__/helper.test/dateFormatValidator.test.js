const dateFormatController=require('../../../helper/dateFormatValidator');



test('return false for invalid date',()=>{
    expect(dateFormatController('2021/10/15')).toEqual(false)
})

test('return true for valid date',()=>{
    expect(dateFormatController('2021-10-15')).toEqual(true)
})