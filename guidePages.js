/**
 * Created by Sinri on 2017/5/4.
 */
var GuidePages = (function () {
    var request={};
    var steps = {};
    var currentStepId = -1;
    var cancelDelegate = function () {
        console.log('GuidePages Cancelled');
    };
    var doneDelegate = function (request) {
        console.log('GuidePages Done');
    };

    function displayStep(id) {
        var target_step = steps[id];
        target_step.render(target_step.step_info,target_step.step_data);
    }

    return {
        init: function () {
            steps = {};
            request={};
            currentStepId = -1;
        },
        //
        addStep: function (
            step_id,step_info,step_data,render,previous_step_id,next_step_id,before_go_previous,before_go_next
        ) {
            steps[step_id]={
                step_id:step_id,
                step_info:step_info,
                step_data:step_data,
                render:render,
                previous_step_id:previous_step_id,
                next_step_id:next_step_id,
                before_go_previous:before_go_previous,
                before_go_next:before_go_next
            };
        },
        addOrderedSteps: function (list) {
            if(!list) return false;
            var step_id=1;
            for(var i=0;i<list.length;i++,step_id++){
                // item requests:
                // step_info,step_data,render,before_go_previous,before_go_next
                list[i].step_info.is_first=(i===0);
                list[i].step_info.is_final=(i===list.length-1);
                list[i].step_id=step_id;
                list[i].previous_step_id=step_id-1;
                list[i].next_step_id=(step_id>=list.length?0:step_id+1);
                steps[step_id]=list[i];
            }
            //console.log('addOrderedSteps steps:',steps);
        },
        setCancelDelegate: function (callback) {
            cancelDelegate = callback;
        },
        setDoneDelegate: function (callback) {
            doneDelegate = callback;
        },
        //
        getCurrentStepId: function () {
            return currentStepId;
        },
        start:function(id){
            if(!id)id=1;
            currentStepId=id;
            displayStep(currentStepId);
        },
        nextStep: function () {
            var input_data=steps[currentStepId].before_go_next();
            //console.log("nextStep input_data",input_data);
            steps[currentStepId].step_data=input_data;
            console.log('nextStep steps...data',steps[currentStepId].step_data);
            for (var name in input_data) {
                if (input_data.hasOwnProperty(name)) {
                    request[name]=input_data[name];
                }
            }
            console.log('request',request);
            if(steps[currentStepId].next_step_id) {
                currentStepId = steps[currentStepId].next_step_id;
                displayStep(currentStepId);
            }else{
                this.guideDone();
            }
        },
        previousStep: function () {
            steps[currentStepId].before_go_previous();
            if(steps[currentStepId].previous_step_id) {
                currentStepId = steps[currentStepId].previous_step_id;
                displayStep(currentStepId);
            }
        },
        guideCancel: function () {
            cancelDelegate();
        },
        guideDone: function () {
            doneDelegate(request);
        }
    };
})();