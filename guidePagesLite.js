/**
 * Created by Sinri on 2017/5/8.
 */
var GuidePagesLite = (function () {
    var steps = [];
    var currentStepId = -1;
    var cancelDelegate = function () {
        console.log('GuidePages Cancelled');
    };
    var doneDelegate = function () {
        console.log('GuidePages Done');
    };
    var stepOverDelegate = function (displaying_div_id, come_div_id, type) {
        console.log('GuidePages Step Over [' + type + ']: ' + displaying_div_id + " to " + come_div_id);
    };
    return {
        init: function () {
            steps = [];
            currentStepId = -1;
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
        setStepOverDelegate: function (callback) {
            stepOverDelegate = callback;
            return this;
        },
        addStep: function (step_div_id) {
            steps.push(step_div_id);
            return this;
        },
        next: function () {
            var displaying_div_id = null;
            if (currentStepId >= 0) {
                displaying_div_id = steps[currentStepId];
            }
            var next_div_id = null;
            if (currentStepId + 1 < steps.length) {
                next_div_id = steps[currentStepId + 1];
            }
            if (!stepOverDelegate(displaying_div_id, next_div_id, 'next'))return false;
            if (currentStepId + 1 >= steps.length) {
                doneDelegate();
                return false;
            }
            currentStepId += 1;
            if (displaying_div_id) {
                document.getElementById(displaying_div_id).style.display = 'none';
            }
            document.getElementById(steps[currentStepId]).style.display = 'block';
            return true;
        },
        prev: function () {
            var displaying_div_id = null;
            if (currentStepId >= 0) {
                displaying_div_id = steps[currentStepId];
            }
            var prev_div_id = null;
            if (currentStepId > 0) {
                prev_div_id = steps[currentStepId - 1];
            }
            if (currentStepId === 0) {
                //cancelDelegate();
                return false;
            }
            if (!stepOverDelegate(displaying_div_id, prev_div_id, 'prev'))return false;
            //console.log("before minus: " + currentStepId);
            document.getElementById(steps[currentStepId]).style.display = 'none';
            currentStepId -= 1;
            document.getElementById(steps[currentStepId]).style.display = 'block';
            return true;
        },
        cancel: function () {
            cancelDelegate();
        }
    };
})();