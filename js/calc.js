const container = document.querySelector(".container");
const add = document.querySelector("button.add");
const startFromNew = document.querySelector(".start-from-new");
const history = document.querySelector(".history");
const items = document.querySelector(".items");
const content = document.querySelector(".clc-content");
const total = document.querySelector(".total");
const amount = document.querySelector(".amount");
const reminder = document.querySelector(".reminder");
const reminderOnIt = document.querySelector(".reminder-on");
const save_btn = document.querySelector("button.save");
const orders = document.querySelectorAll(".order");
let data = JSON.parse(localStorage.getItem("data")) || [];
const table = document.createElement("table");


let clcReminder = () => {
    let minus = parseInt(amount.value || 0) - parseInt(total.value || 0);
    if (minus > 0) {
        reminder.value = minus;
        reminderOnIt.value = "";
        amount.style.backgroundColor = "green";
        total.style.color = "black";
    } else if (minus == 0) {
        reminder.value = minus;
        reminderOnIt.value = "";
        amount.style.backgroundColor = "black";

    }
    else {
        reminderOnIt.value = Math.abs(minus);
        reminder.value = "";
        amount.style.backgroundColor = "red";
        total.style.color = "red";
    }
};

let sum = document.querySelector(".sum");

let all_sum = () => {
    const quantity = document.querySelectorAll(".quantity");
    const cost = document.querySelectorAll(".cost");
    let sum = 0;
    for (let i = 0; i < cost.length; i++) {
        sum +=
            parseInt(cost[i].value || 0) * parseInt(quantity[i].value || 0);
        total.value = sum;
    }
    clcReminder();
};

add.addEventListener("click", (e) => {
    let item = document.createElement("div");
    item.classList.add("add-field");
    item.innerHTML = ` <div class="clc-item row g-1 mt-10">
          <div>
  
              <label for="cost" > سعر المنتج </label>
              <input type="number" id="cost" class="cost" onkeyup="all_sum()">
          </div>
          <div>
  
              <label for="quantity"> كمية المنتج</label>
              <input type="number" id="quantity" class="quantity" onkeyup="all_sum()">
          </div>
          <button class="remove"  onclick="removeItem(this)"> حذف</button>
      </div>`;
    items.appendChild(item);
    // removeItem();
});

let clear = () => {
    let items = document.querySelectorAll(".add-field") || [];
    let inputs = document.querySelectorAll("input") || [];
    items.forEach((element) => {
        element.remove();
    });
    inputs.forEach((element) => {
        element.value = "";
    });
    // moveButtonAdd();
};
startFromNew.addEventListener("click", clear);

let save = () => {
    if (!total.value) return;
    const quantity = document.querySelectorAll(".quantity");
    const cost = document.querySelectorAll(".cost");
    let items = [];
    let item = {};
    let today = new Date().toLocaleString();
    for (let i = 0; i < cost.length; i++) {
        items.push({
            "سعر المنج": cost[i].value,
            "كمية المنتج": quantity[i].value,
        });
    }
    item[today] = items;
    item["total"] = total.value;

    data.push(item);
    localStorage.setItem("data", JSON.stringify(data));
    clear();
};


save_btn.addEventListener("click", save);

const removeItem = (e) => {
    console.log(e.parentElement.remove())
    all_sum()
};

let showData = (key = null) => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    let table_header = document.createElement("thead");

    table_header.innerHTML = `<tr>
      <td>
          تاريخ الطلب
          </td>
          <td>
          وقت الطلب
          </td>
          
          <td>
              المجموع
              </td>
      </tr>`;

    table.innerHTML = data
        .map((row) => {
            let dateTime = Object.keys(row)[0].split(",");

            return `<tr class='order' onclick="getOrderDetails('${Object.keys(row)[0]
                }')">
                  <td>
                      ${dateTime[0]}
                  </td>
                  <td>
                      ${dateTime[1]}
                  </td>
                  <td>
                  ${row["total"]}
                  </td>
                  </tr>
                  `;
        })
        .join(" ");
    table.prepend(table_header);
    container.appendChild(table);
};
history.addEventListener("click", showData);


let getOrderDetails = (id) => {
    // let table = document.createElement("table");
    // let data = JSON.parse(localStorage.getItem("data")) || [];
    let table_header = document.createElement("thead");
    table_header.innerHTML = `<tr>
      <td>
          سعر المنتج
          </td>
          <td>
              كمية المنتج
              </td>
      </tr>`;
    let search = data.filter((row) => Object.keys(row)[0] == id);
    table.innerHTML = search.map((row) => {
        let items = row[Object.keys(row)[0]];
        let colum = items
            .map((item) => {
                return `<tr class='order'>
                  <td>
                      ${item["سعر المنج"]}
                  </td>
                  <td>
                      ${item["كمية المنتج"]}
                  </td>
                  </tr>
                  `;
            })
            .join(" ");
        return ` <tbody>
                  ${colum}
                  </tbody>
                  <tfoot>
                  <tr>
                  <td>المجموع</td>
                  <td>${row["total"]}</td>
                  </tr>
              </tfoot>
                  `;
    });
    table.prepend(table_header);
    console.log(table);
    container.appendChild(table);
};
const del_histry = () => {
    localStorage.removeItem('data');
}
setInterval(() => {
    let current = new Date();
    if (current.getHours() == 18) {
        localStorage.removeItem('data');
    }
}, 306000)
amount.addEventListener('keyup', () => {
    all_sum()
})