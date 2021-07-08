export default{
    changeTime:function(_testDate){
        _testDate=new Date(_testDate);
        return (_testDate.toLocaleString('default', { month: 'long' })+','+ _testDate.getDate()+','+_testDate.getFullYear());
    },
    changeTimeWithAMorPM:function(_testDate){
        console.log('check date',_testDate)
        _testDate=new Date(_testDate);
        return (_testDate.toLocaleString('default', { month: 'long' })+','+ _testDate.getDate()+','+_testDate.getFullYear()+' '+_testDate.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"));
    },
}

