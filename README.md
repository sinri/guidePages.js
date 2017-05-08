# guidePages.js
plugin for guide with pages in JavaScript

一直想弄一个类似安装程序的向导的模型给前端页面用。
于是做了强自定义的guidePages.js,不过感觉这一个还是太吃内存，不知道是不是我的错觉。
简化了一下出了Lite版本，感觉基本能支持了。

License MIT

# Usage of guidePagesLite.js

You can refer to the sample file `sample_lite.html`.

## Design your steps

You must determine what steps you need in your guide, in the sample, only three steps involved.

Commonly, there would be three control buttons:
 
* `cancel` (always available, or not exists at all),
* `previous` (hidden on first step), 
* `next` (as `submit` on final step).

For these buttons, action `cancel`, `step_previous` and `step_next` and `submit` should be defined. 

## Initialize

### As of HTML

Make each step into a `div` tag and give them special `id`.
You can put control buttons within each step div, or make them independently outside.

### As of JavaScript

Add the following code.

```js
// set up a reference of GuidePagesLite
var guide=GuidePagesLite;
// clear the data of guide
guide.init();
// repeat this line as you need, with different div ids.
guide.addStep('step_div');
// set up what you want to do when cancel. such as close window or sth else.
guide.setCancelDelegate(function(){
    //
});
// set up what you want to do for submitting.
guide.setDoneDelegate(function(){
    //
});
// this is designed for control, 
// you can decide if the guide should turn to given come_div_id by setting return boolean,
// type given as `prev` or `next`.
guide.setStepOverDelegate(function (current_div_id, come_div_id, type) {
    //
});
// finally set off the guide
guide.next();
```