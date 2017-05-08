/**
 * Created by Sinri on 2017/5/8.
 */
var GuidePagesLite = (function () {
    var steps=[];
    var currentStepId = 0;
    var cancelDelegate = function () {
        console.log('GuidePages Cancelled');
    };
    var doneDelegate = function () {
        console.log('GuidePages Done');
    };
    return {
        init:function (){
            steps=[];
            return this;
        },
        setCancelDelegate: function (callback) {
            cancelDelegate = callback;
            return this;
        },
        setDoneDelegate: function (callback) {
            doneDelegate = callback;
            return this;
        },
        addStep:function(step_div_id){
            steps.push(step_div_id);
            return this;
        },
        next:function(){
            var displaying_div_id=steps[currentStepId];
            currentStepId+=1;
            if(currentStepId>=steps.length){
                doneDelegate();
                return false;
            }
            document.getElementById(displaying_div_id).style.display='none';
            document.getElementById(steps[currentStepId]).style.display='block';
            return true;
        },
        prev:function(){
            if(currentStepId===0){
                cancelDelegate();
                return false;
            }
            document.getElementById(steps[currentStepId]).style.display='none';
            currentStepId-=1;
            document.getElementById(steps[currentStepId]).style.display='block';
            return true;
        },
        cancel:function(){
            cancelDelegate();
        }
    };
})();