

function ShowMessageExternPre(firstName, lastName) {
    alert("Hello Extern Pre" + firstName + " " + lastName);
    console.log("\n\nLOADED IT",Module,"END")
}


function TheThrowing(){
    throw "ERROR"
}

function applyTryCatch(val, self, args){
    try {

        return val.apply( self, args)
    }
    catch(e)
    {
        console.log("WE CATCHED THAT ERROR",e)
        const err_obj = {
            __embind11__error__: e
        }
        return err_obj
    }
}


function ShowMessageExternPre(firstName, lastName) {
    alert("Hello Extern Pre" + firstName + " " + lastName);
    console.log("\n\nLOADED IT",Module,"END")
}


function TheThrowing(){
    throw "ERROR"
}

function applyTryCatch(val, self, args){
    try {

        return val.apply( self, args)
    }
    catch(e)
    {
        console.log("WE CATCHED THAT ERROR",e)
        const err_obj = {
            __embind11__error__: e
        }
        return err_obj
    }
}
var createModule = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(createModule) {
  createModule = createModule || {};



  return createModule.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = createModule;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return createModule; });
else if (typeof exports === 'object')
  exports["createModule"] = createModule;