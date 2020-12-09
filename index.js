let fetchBtn = document.getElementById("fetchBtn");

fetchBtn.addEventListener("click", buttonclickhandler);

function buttonclickhandler() {

    var completed = 0;

    const selectItem = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (completed == 5) resolve();
            }, 120);
        });
    }
    var url =
        "https://jsonplaceholder.typicode.com/todos";

    // AJAX Request
    var todo = new XMLHttpRequest();
    todo.open("GET", url);
    todo.send();

    todo.addEventListener("load", function(e) {
        var data = e.target.response;
        var response = JSON.parse(data);
        const table = document.getElementById('table');
        const properties = Object.getOwnPropertyNames(response[0]);
        response.forEach((items, j) => {
            var tr = document.createElement('tr');
            properties.forEach((prop, i) => {
                if (i == 3) {
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    if (!(checkbox.checked = checkbox.disabled = response[j][prop] == true)) {
                        checkbox.addEventListener("change", (box) => {
                            if (checkbox.checked == true) completed++;
                            else completed--;
                            selectItem().then(() => {
                                alert("5 Tasks completed")
                            })
                        })
                    }
                    var cell = document.createElement("td");
                    cell.appendChild(checkbox)
                    tr.appendChild(cell);
                    return;
                }

                tr.appendChild(document.createElement('td'));
                tr.cells[i].appendChild(document.createTextNode(response[j][prop]))
            })
            table.appendChild(tr);
        })

    });


}

const submitBtn = document.querySelector('#logout');
submitBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    window.location.replace("index.html");
    return false;
});