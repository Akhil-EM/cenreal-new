export default{
    changeTime:function(_testDate){
        _testDate=new Date(_testDate);
        return (_testDate.toLocaleString('default', { month: 'long' })+','+ _testDate.getDate()+','+_testDate.getFullYear());
    }
}

