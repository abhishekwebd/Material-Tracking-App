$("#page-content-wrapper").css("padding","0px");
$("#menu-toggle").css("padding-left","25px");
$(window).load(function() {
	$(".loader").fadeOut("slow");
});


$("#loginbtn").click(function(){
  $(".loader").fadeIn("slow");
  var loginemail=$("#vendorno").val();
  var loginpassword = $("#loginpassword").val();
  var dataString="username="+loginemail+"&password="+loginpassword;

  $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"vendordata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ $("#logintbtn").val('Validationg...');},
    success: function(data){
      var arr = JSON.parse(data);

      if(arr.d.length >0){

        localStorage.setItem("username", arr.d[0].username);
        localStorage.setItem("vendorname", arr.d[0].vendorname);
        localStorage.setItem("loginpassword", loginpassword);
        localStorage.setItem("stat", arr.d[0].stat);
        var cstat = sessionStorage.getItem("checkboxstat");
        if(cstat == "checked")
        {

         localStorage.setItem("loginstat","rememberit");
       }

       if( arr.d[0].stat == "1")
       {
        window.location = "main.html";
      }
      else if( arr.d[0].stat == "0")
      {
        window.location = "changepassword.html";
      }


    }else{

     document.getElementById("alert").innerText = "Invalid  Password";

   }


 }
});
});


$("#changebtn").click(function(){
  $(".loader").fadeIn("slow");
  var newpasscode=$("#newpass").val();
  var cnewpasscode = $("#cnewpass").val();

  if(newpasscode == cnewpasscode)
  { 
    var dataString="uname="+localStorage.getItem("username")+"&passtext="+newpasscode;
    $.ajax({
      type: "GET",
      url:localStorage.getItem("serverpath")+"vendordata.php",
      data: dataString,
      crossDomain: true,
      cache: false,
      beforeSend: function(){ $("#changebtn").val('Validationg...');},
      success: function(data){

        $("#changebtn").val(data);
        window.setTimeout(function(){

         localStorage.removeItem("username");
         localStorage.removeItem("vendorname");
         localStorage.removeItem("loginpassword");
         sessionStorage.removeItem("checkboxstat");
         localStorage.setItem("loginstat","userloggedout");
         window.location.href = "home.html";

       }, 2000);
      }
    });

  }
  else
  {
   document.getElementById("alert").innerText = "Password not matched";

 }

});



function loadrecord(pono)
{
   //alert(month);
   var dataString="ponoseletced="+pono+"&vendorno="+localStorage.getItem("username");
   $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"vendordata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ },
    success: function(data){
     var arr = JSON.parse(data);
     $("#challanlist").empty();
     if(arr.length > 0)
  {
     $("#challanlist").append("<table class='ak-table ak-left'>");
     
     for(var i =0 ;i<arr.length;i++)
     {
      $("#challanlist").append("<tr class='ak-hover-yellow'><td>"+(i+1)+"</td><td class='ak-card-4' onclick='redirect("+arr[i].id+")'>"+arr[i].challan_no+"</td></tr>");
     }

    $("#challanlist").append("</table>");
  }
  else
  { $("#challanlist").append("<table class='ak-table'>");
    $("#challanlist").append("<tr><td class='ak-hover-red'>No Record Found</td></tr>");
    $("#challanlist").append("</table>");
  }


}
});
 }

 function redirect(id)
 {
   sessionStorage.setItem("challanno",id);
   window.location.href = "detail.html";

 }

 function loadchallandetail()
 {
  var dataString="challanno="+sessionStorage.getItem("challanno")+"&ccode=challandetail";
  $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"vendordata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ $("#changebtn").val('Validationg...');},
    success: function(data){
      var arr = JSON.parse(data);

      document.getElementById("challano").innerText = arr[0].challan_no;
      document.getElementById("crno").innerText = arr[0].recd_date;
      document.getElementById("islno").innerText = arr[0].isl_no;
      document.getElementById("qtys").innerText = arr[0].recd_qty;
      document.getElementById("qtya").innerText = arr[0].acc_qty;
      document.getElementById("qtyr").innerText = arr[0].reg_qty;
      document.getElementById("rejmemo").innerText = arr[0].rej_no;
      document.getElementById("rono").innerText = arr[0].ro_no;
      document.getElementById("pono").innerText = arr[0].po_no;

      
    }
  });
}

function loadpono()
{

  var dataString="code=pono&vendorno="+localStorage.getItem("username");
  $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"vendordata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ },
    success: function(data){
     var arr = JSON.parse(data);
     var options = "";
     if(arr.length > 0)
     {
       for(var i =0 ;i<arr.length;i++)
       {
         $("#polist").append("<option>"+arr[i].po_no+"</option>");

       }
       loadrecord(arr[0].po_no);
     }
     else
     {
      $("#polist").append("<option>No Record Found</option>");
    }
    

  }
});
}

function loadnote()
{
  var dataString="getnote=note";
  $.ajax({
    type: "GET",
    url:localStorage.getItem("serverpath")+"vendordata.php",
    data: dataString,
    crossDomain: true,
    cache: false,
    beforeSend: function(){ },
    success: function(data){

      $("#note").text(data);
    //document.getElementById("note").innerText = data;

  }
});
}

$( "#polist" ).change(function() {
  var polist = $("#polist").val(); 
  sessionStorage.setItem("pono",polist);
  loadrecord(polist);
});

$("#logoutbtn").click(function(){

  localStorage.removeItem("username");
  localStorage.removeItem("vendorno");
  localStorage.removeItem("loginpassword");
  sessionStorage.removeItem("checkboxstat");
  localStorage.setItem("loginstat","userloggedout");
  window.location = "home.html";
});


