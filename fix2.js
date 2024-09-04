  var transactions = [];
  var balance = 0;

  var judul = document.getElementById("judul");
  judul.innerHTML = "<strong>Catatan Keuangan Rakryan</strong>";

  let color = prompt("Enter nama warna");
  document.body.style.background = color;

  function addTransaction() {
    var desc = document.getElementById("inputDesc").value;
    var amountInput = document.getElementById("inputAmount");
    var amount = Number(amountInput.value);
    var type = document.getElementById("inputType").value;
    var addTransactionBtn = document.getElementById("addTransactionBtn");

    if (desc.trim() === "" || isNaN(amount) || type === "") {
      alert("Mohon isi deskripsi, jumlah, jenis transaksi, dan kategori dengan benar!");
      return;
    }

    var transaction = {
      desc: desc,
      amount: amount,
      type: type
    };

    transactions.push(transaction);

    // Membuat baris baru untuk tabel transaksi
    var newRow = document.createElement("tr");

    // Membuat sel untuk deskripsi
    var descCell = document.createElement("td");
    descCell.textContent = desc;
    descCell.style.whiteSpace = "nowrap";
    // descCell.style.wordBreak = "break-word";
    // descCell.style.overflow = "hidden";
    // descCell.style.textOverflow = "ellipsis";
    // descCell.style.maxWidth = "200px";
    newRow.appendChild(descCell);
    

    // Membuat sel untuk jumlah
    var amountCell = document.createElement("td");
    amountCell.textContent = formatAmount(amount);
    newRow.appendChild(amountCell);

    // Membuat sel untuk tipe
    var typeCell = document.createElement("td");
    typeCell.textContent = type === "income" ? "Pemasukan" : "Pengeluaran";
    newRow.appendChild(typeCell);

    // Membuat sel untuk ikon "Delete"
    var actionCell = document.createElement("td");
    actionCell.appendChild(createDeleteIcon(newRow));
    newRow.appendChild(actionCell);


    // Menambahkan baris baru ke tabel transaksi
    var transactionListTable = document.getElementById("transactionList");

    if (type === "income") {
      descCell.style.backgroundColor = "hsla(119, 40%, 54%, 0.329)";
      amountCell.style.backgroundColor = "hsla(119, 40%, 54%, 0.329)";
      typeCell.style.backgroundColor = "hsla(119, 40%, 54%, 0.329)";
      actionCell.style.backgroundColor = "hsla(119, 40%, 54%, 0.329)";
    } 
    else {
      descCell.style.backgroundColor = "#d952505e";
      amountCell.style.backgroundColor = "#d952505e";
      typeCell.style.backgroundColor = "#d952505e";
      actionCell.style.backgroundColor = "#d952505e";
    }
    //insertbefore
    transactionListTable.insertBefore(newRow, transactionListTable.childNodes[1]);
    
    // style manipulation
    newRow.style.backgroundColor = type === "income" ? "hsla(119, 40%, 54%, 0.329)" : "#d952505e";
    // addTransactionBtn.setAttribute("disabled", "");

    if (type === "income") {
      balance += amount;
    } else {
      balance -= amount;
    }

    updateBalance();
    updateTotal(type, amount);
    
    // Reset input fields
    document.getElementById("inputDesc").value = "";
    amountInput.value = "";
    document.getElementById("inputType").value = "";

    //replaceChild
    if (transactions.length > 5) {
      // Hapus seluruh transaksi dari tabel
      var newTransactionListTable = document.createElement("tbody");
      // Tambahkan baris baru ke tabel transaksi
      newTransactionListTable.appendChild(newRow);
      // Ganti tabel lama dengan tabel baru yang hanya berisi 5 transaksi terakhir
      transactionListTable.parentNode.replaceChild(newTransactionListTable, transactionListTable);
    } else {
      // Tambahkan baris baru ke tabel transaksi
      transactionListTable.appendChild(newRow);
    }
  }
  
   //event button click
  document.getElementById("addTransactionBtn").addEventListener("click", addTransaction);

  //EVENT LISTENER
  //keyup
  input.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
      addTransaction();
    }
  });

  //mouseout mouseover
  var inputAmount = document.getElementById("inputAmount");
  inputAmount.addEventListener ("mouseover", function(){
    inputAmount.setAttribute ("placeholder", "Hanya dapat memasukkan angka");
  });
  inputAmount.addEventListener ("mouseout", function(){
    inputAmount.setAttribute ("placeholder", "Masukkan jumlah");
  });

  //input
  inputDesc.addEventListener("input", deskripsi);
  function deskripsi(){
    console.log(inputDesc.value);
  }

  //change
  input.addEventListener("input", change);
  function change(){
    console.log("Elemen kehilangan fokus");
  }

  function formatAmount(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  }

  function updateBalance() {
    var balanceElement = document.getElementById("balance");
    balanceElement.innerText = formatAmount(balance);
  }

  function updateTotal(type, amount) {
    var totalIncomeElement = document.getElementById("totalIncome");
    var totalExpenseElement = document.getElementById("totalExpense");

    var totalIncome = 0;
    var totalExpense = 0;

    transactions.forEach(function(transaction) {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    totalIncomeElement.textContent = formatAmount(totalIncome);
    totalExpenseElement.textContent = formatAmount(totalExpense);
  }
  
  function createDeleteIcon(row) {
    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "delete-icon");
    deleteIcon.addEventListener("click", function () {
      deleteTransaction(row);
    });
    return deleteIcon;
  }
  
  function deleteTransaction(row) {
    var rowIndex = row.rowIndex;
    row.parentNode.removeChild(row); // Hapus baris dari tabel
  }

function createDeleteButton() {
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.addEventListener("click", function () {
    deleteTransaction(this.parentElement.parentElement);
  });
  return deleteButton;
}

function createEditIcon(row) {
  var editIcon = document.createElement("i");
  editIcon.classList.add("fa", "fa-edit", "edit-icon");
  editIcon.addEventListener("click", function () {
    editTransaction(row);
  });
  return editIcon;
}

function addTransactionToTable(transaction) {
  // ... kode sebelumnya ...
  
  // Tambahkan sel untuk ikon "Delete" dan "Edit"
  var actionCell = document.createElement("td");
  actionCell.appendChild(createEditIcon(newRow));
  actionCell.appendChild(createDeleteIcon(newRow));
  newRow.appendChild(actionCell);

  // ... kode selanjutnya ...
}