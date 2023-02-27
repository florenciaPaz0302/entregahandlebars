const socket = io();

const addProduct = document.getElementById('addProduct');
const deleteProduct = document.getElementById('deleteProduct');

socket.on("connected", (data) => {
    console.log('Conectado al Servidor.')
})

socket.on("products", data => {
    let list = document.getElementById("productList");
    let products = ''

    console.log(data)

    data.forEach((producto) => {
        products = products + `<tr>
        <td> ${producto.id}            </td>
        <td> ${producto.Title}         </td>
        <td> ${producto.Description}   </td>
        <td> ${producto.Code}          </td>
        <td> ${producto.Price}         </td>
        <td> ${producto.Stock}         </td>
        <td> ${producto.Category}      </td>
    </tr>`
    })

    list.innerHTML = products;
});

addProduct.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const thumbnails = document.getElementById('thumbnails').value;

    socket.emit('AddProduct', {title, description, code, price, stock, category, thumbnails})

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('code').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('category').value = '';
    document.getElementById('thumbnails').value = '';

    return false;
})

deleteProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const pid = document.getElementById('pid').value;
    socket.emit('DeleteProduct', {pid})
    document.getElementById('pid').value = '';
    return false;
});