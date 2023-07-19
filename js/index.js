window.onload = function() {
 
    /* Declaring Variable And Initializtion Of Values */
    var i,j,count = 0,elem;
    var rows = document.querySelector(".rows");
    var columns = document.querySelector(".columns");
    var matrix_con = document.querySelector(".matrix-con");
    var matrix_counting = document.getElementsByClassName("no_of_matrix");
    var matrix = {
        row : 3,
        column : 3,
        count : 2
    }
    /* End Declaring Variable And Initializtion Of Values */


    /* Event Handlers */
        rows.oninput = function() {
            this.previousElementSibling.innerHTML = "Rows - "+this.value;
            matrix.row = Number(this.value);
            updateOrder();
            makeMatrix(true,true,true);
            validateInputs();
        }

        columns.oninput = function() {
            this.previousElementSibling.innerHTML = "Columns - "+this.value;
            matrix.column = Number(this.value);
            updateOrder();
            makeMatrix(true,true,true);
            validateInputs();
        }

        for(i = 0; i < matrix_counting.length; i++) {
            matrix_counting[i].onchange = function() {
                matrix.count = Number(this.value);
                makeMatrix(true,true,true);
                validateInputs();
            }
        }
    /* End Event Handlers */


    /* Functions */
        /* Update Order Of Matrix */
        function updateOrder() {
            document.querySelector(".order").innerHTML = matrix.row+" x "+matrix.column+" Matrix";
        } 

        /* Makes An Matrix */
        function makeMatrix(Matrixclear = false,isIncludeAddOperator = false,isIncludeEqualOperator = false,isOutput = false) {
            count++;

            // Remove Previous Matrices
            if(Matrixclear) {
                count = 1;
                matrix_con.innerHTML = "";
            }

            // Create Matrix/Table
            var class_name = String.fromCharCode(Number("A".charCodeAt())+(count-1));
            var table = document.createElement("TABLE");
            table.className = "matrix "+class_name;
            matrix_con.appendChild(table);

            // Remove Previous Output Element
            if(isOutput)
            {
                table.setAttribute("data-output",true);

                if(table.previousElementSibling.getAttribute("data-output"))
                {
                    table.previousElementSibling.remove();
                }
            }

            // Make Rows And Columns In Matrix
            for(i = 1; i <= matrix.row;i++) {
                var tr = document.createElement("TR");
                table.appendChild(tr);

                for(j = 1; j <= matrix.column;j++) {
                    var td = document.createElement("TD");
                    tr.appendChild(td);

                    if(isOutput) {
                        elem = document.createElement("DIV");
                        elem.innerHTML = showResult(i,j);
                        elem.className = "outputs";
                    }

                    else {
                        elem = document.createElement("INPUT");
                        elem.type = "number";
                        elem.className = "inputs";
                    }

                    td.appendChild(elem);

                    i == 1 && j == 1 ? makeCorner(td,"top_left") : "";
                    i == 1 && j == matrix.column ? makeCorner(td,"top_right") : "";
                    i == matrix.row && j == 1 ? makeCorner(td,"bottom_left") : "";
                    i == matrix.row && j == matrix.column ? makeCorner(td,"bottom_right") : "";
                }
            }
            
            // Check If Add Operator Required
            if(count < matrix.count && isIncludeAddOperator) {
                var div_add = document.createElement("DIV");
                div_add.className = "addition_op";
                div_add.innerHTML = "+";
                matrix_con.appendChild(div_add);
                makeMatrix(false,true,true);
            }

            else {
                // Check If Equal Operator Required
                if(isIncludeEqualOperator) {
                    var div_equal = document.createElement("DIV");
                    div_equal.className = "equal_op";
                    div_equal.innerHTML = "=";
                    matrix_con.appendChild(div_equal);
                }
            }
        }

        /* Make Corner Of Matrix */
        function makeCorner(Elem = "",dir) {
            var div = document.createElement("DIV");
            div.className = "edges "+dir;

            Elem.style.position = "relative";
            Elem.appendChild(div);
        }

        /* Validation */
        function validateInputs() {
            var inputs = document.getElementsByClassName("inputs");
            var total_inputs = matrix.row*matrix.column*matrix.count;

            for(i = 0; i < inputs.length;i++) {
                inputs[i].oninput = function(e) {
                    // Set Maximum Input Length
                    if(Number(this.value.length) > 4) {
                        this.value = this.value.slice(0,this.value.length-1);
                    }

                    // If Inputs Have Zero Length
                    if(e.inputType == "deleteContentBackward" && Number(this.value.length) == 0) {
                        this.value = 0;
                    }

                    // Remove Zero From Input Field
                    if(this.value == Number(0+''+e.data) && e.inputType == "insertText" && this.value.length == 2)
                    {
                        this.value = e.data;
                    }

                    var input_count = 0;
                    for(j = 0; j < inputs.length;j++) {
                        if(inputs[j].value.length > 0) {
                            input_count++;
                        }

                        else {
                            input_count--;
                        }

                        if(input_count == total_inputs) {
                            makeMatrix(false,false,false,true);
                        }
                    }

                }
            }
        }

        /* Show Result */
        function showResult(row,column) {
            var r,c,v;

            r = document.querySelector(".A").getElementsByTagName("tr")[row-1];
            c = r.getElementsByTagName("td")[column-1];
            v = c.getElementsByTagName("input")[0].value;

            r = document.querySelector(".B").getElementsByTagName("tr")[row-1];
            c = r.getElementsByTagName("td")[column-1];
            v = Number(v) + Number(c.getElementsByTagName("input")[0].value);

            if(matrix.count == 3)
            {
                r = document.querySelector(".C").getElementsByTagName("tr")[row-1];
                c = r.getElementsByTagName("td")[column-1];
                v = Number(v) + Number(c.getElementsByTagName("input")[0].value);
            }

            return v;
        }
    /* End Functions */
      
    /* On Page Loaded Calling Functions */
    updateOrder();
    makeMatrix(true,true,true);
    validateInputs();
    /* End On Page Loaded Calling Functions */

}