function showdetails()
{
    // alert("show details");
fetch('http://localhost:8080/auth/customerdetails')
.then(response => response.json())
.then((cus)=>{
    const customers=document.getElementById('customerdetails')
    cus.forEach(custo => {
        var row=`<tr>
        <td>${custo.customerId}</td>
        <td>${custo.customerName}</td>
        <td>${custo.CustomerPhone}</td>
        <td>${custo.Machine}</td>
        <td>${custo.changePart}</td>
         <td>${custo.price}</td>
         <td>${custo.now}</td>
         <td>${custo.late}</td>
         <td>${custo.status}</td>
         <td><a href="edit.html?customerId=${custo.customerId}">Edit</a></td>

        </tr>`;
        customers.innerHTML+=row;
        
    });
})


.catch(error => {
    console.error('Error fetching customer details:', error);
});
}


