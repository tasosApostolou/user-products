$(document).ready(function(){

    $.ajax({
      url:'http://localhost:3000/api/products',
      type:'get',
      dataType:'JSON'
    })
    .done(function(response){
      // console.log(">>", response);
      let data = response.data;
      // let status = response.status
      console.log(data)
      
      if (data.length>0) { 
          createTbody(data);
      } else {
          alert(false,'Πρόβλημα στην αναζήτηση των χρηστών ('+ data.message + ')');
          // console.log(data);
      }
    });
  
    $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {
  
      let product = $("#product").val();
      let cost = $("#cost").val();
      let description = $("#description").val();
      let quantity = $("#quantity").val();
  
      const item = {
        'product': product,
        'cost': cost,
        'description': description,
        'quantity': quantity,
    
      }
  
    
  
      console.log($('.btnSubmit').val(), item);
      $.ajax({
        url: "http://localhost:3000/api/products",
        type: "post",
        data: item,
        dataType: "JSON",
        // encode: true,
      })
      .done( function(response) {
        // console.log(">>", response);
        
        let data = response.data;
        let status = response.status
    
        if (status) { 
            console.log(true,'Επιτυχής εισαγωγή του προιοντος');
            alert(true,'Επιτυχής εισαγωγή του προιοντος');
            $('#frmUser')[0].reset();
            window.location.replace("http://localhost:3000/product/find.html")
        } else {
            console.log(false,'Πρόβλημα στην εισαγωγή του προιοντος ('+ data.message + ')');
            alert(false,'Πρόβλημα στην εισαγωγή του προιοντος ('+ data.message + ')');
            $('#frmUser')[0].reset();
            // console.log(data.message);
        }
      });
  
      return false
    });
  
  });
  
  function createTbody(data){
  
    $("#userTable > tbody").empty();
  
    // console.log("CreateTBody", data);
    const len = data.length;
    for (let i=0; i<len; i++){
      let product = data[i].product;
      let cost = data[i].cost;
      let description = data[i].description;
      let quantity = data[i].quantity;
      // let address = data[i].address.area + ", " + data[i].address.road;
      // let phone = "";
      // for (let x=0; x<data[i].phone.length; x++ ){
      //   phone = phone + data[i].phone[x].type + ":" + data[i].phone[x].number + "<br>"
      // }
      
      // console.log(username, name);
  
      let tr_str = "<tr>" +
        "<td>" + product + "</td>" +
        "<td>" + cost + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + quantity + "</td>" +
        // "<td>" + address + "</td>" +
        // "<td>" + phone + "</td>" +      
        "<td>" +
            "<button class='btnUpdate btn btn-primary' value=\'"+product+"\'>Τροποποίηση</button> " +
            "<button class='btnDelete btn btn-primary' value=\'"+product+"\'>Διαγραφή</button>" +
        "</td>" + 
        "</tr>";


       


  
      $("#userTable tbody").append(tr_str);
    }
  }
  
  function alert(status, message){
    if (status){
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('alert-danger');
    } else {
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('alert-success');
    }
    $('.alert').html(message);
  }
  
  