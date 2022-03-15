<!doctype html>
<html lang="en-us">
<head>
  <title>python3.11-wasm embeded via pybind11 build by boa</title>
</head>
<body>


  <!-- <h3>python3.11-wasm embeded via pybind11 build by boa</h3> -->
  <form name="myform">
  <td><textarea name="inputtext"></textarea></td>
   <td><canvas name="mycanvas" id="mycanvas" width="1000" height="200"></canvas></td> 

  Output:
  <td><textarea name="outputtext"></textarea></td> 
  </form>


  <script type="application/javascript" src="embed.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.js"></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/mode/python/python.js'></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.css" />
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/theme/monokai.css'/>
  <script type="application/javascript">


    outputtext = document.myform.outputtext
    outputtext.value = ""

    var editor = CodeMirror.fromTextArea(document.myform.inputtext, {
      lineNumbers: true,
      mode: 'python',
      //  add theme attribute like so:
      theme: 'monokai',
      extraKeys: {
            "Tab": function(cm){
              cm.replaceSelection("   " , "end");
            }
           }
    });

    var logeditor = CodeMirror.fromTextArea(document.myform.outputtext, {
      lineNumbers: false,
      readOnly: true,
      //  add theme attribute like so:
      theme: 'monokai'
    });
    logeditor.setSize(null, 200);

    
    const print = (text) => {
      
      logeditor.replaceRange(text+"\n", CodeMirror.Pos(logeditor.lastLine()))
      editor.scrollTo(CodeMirror.Pos(logeditor.lastLine()));
    }
    const printErr = (text) => {
      logeditor.replaceRange("ERROR: "+text+"\n", CodeMirror.Pos(logeditor.lastLine()))
    }


    window.onload = () => {
        var savedText = localStorage.getItem("text") || "";
        editor.getDoc().setValue(savedText);
    };



    var Module = {}
    createModule({
      print: print,
      printErr:printErr,
      // stderr: stderr,
    })
      .then((themodule) => {
        Module = themodule


        const delay = ms => new Promise(res => setTimeout(res, ms));


        console.log("python_data NEW ..")
        import('./python_data.js').then(datamodule => {
            console.log("directories mounted")


            console.log("delay")
            delay(5000).then(()=>{
              console.log("in delay then")

              console.log("embind11 ..")
              import('./embind11.js').then(datamodule => {
                console.log("libs mounted")
                console.log("Initializing interpreter")

                themodule.initialize_interpreter()


                let btn2 = document.createElement("button");
                btn2.innerHTML = "run-try-catch";
                btn2.onclick = function () {
                  logeditor.getDoc().setValue("")
                  var text = editor.getValue();
                  localStorage.setItem("text", text)

                  try{
                    themodule.exec_code(text)
                  }
                  catch (e) {
                    console.log("ERROR CATCHED",e)
                    logeditor.replaceRange("JS-ERROR: "+String(e)+"\n", CodeMirror.Pos(logeditor.lastLine()))
                  }
                };
                document.body.appendChild(btn2);

              });
            })
        });



        
      });
  </script>
</body>
</html>
